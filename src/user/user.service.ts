import { Injectable, Logger } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReqresService } from './../reqres/reqres.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { UserAvatar } from './interfaces/avatar.interface';
import { EmailService } from './../email/email.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('UserAvatar') private readonly avatarModel: Model<UserAvatar>,
    private readonly reqresService: ReqresService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService
  ) {}

  async find(userId: number): Promise<User> {
    const data = await this.reqresService.getUser(userId);
    return data;
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    const success = await newUser.save();

    if (success._id) {
      this.emailService.sendDummyEmail('rafaellucasxc@gmail.com', 'Dummy', 'Test');
    }

    return success;
  }

  async delete(userId: string): Promise<UserAvatar> {
    return await this.avatarModel.findByIdAndRemove({ _id: userId });
  }

  async findAvatarByUserId(userId: string): Promise<string> {
    const avatar = await this.avatarModel.findOne({ userId });

    if (avatar) {
      const filepath = path.join(__dirname, '..', 'avatars', avatar.fileName);
      const buffer = await fs.promises.readFile(filepath);
      return buffer.toString('base64');
    }

    const user = await this.userModel.findById({ _id: userId });
    const base64Avatar = await this.getBase64Avatar(userId, user.avatar);

    return base64Avatar;
  }

  async getBase64Avatar(userId: string, url: string): Promise<string> {
    const { data } = await lastValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.message;
        })
      )
    );
    const buffer = Buffer.from(data, 'binary');
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const filename = `${hash}.jpg`;
    const dirPath = path.join(__dirname, '..', 'avatars');
    const filepath = path.join(dirPath, filename);

    await fs.promises.mkdir(dirPath, { recursive: true });
    await fs.promises.writeFile(filepath, buffer);

    const avatarModel = new this.avatarModel({ userId, hash, filename });
    await avatarModel.save();

    return buffer.toString('base64');
  }
}
