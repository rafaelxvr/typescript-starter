import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { ReqresModule } from './../reqres/reqres.module';
import { HttpModule } from '@nestjs/axios';
import { UserAvatarSchema } from './schemas/avatar.schema';
import { MailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserAvatar', schema: UserAvatarSchema }
    ]),
    ReqresModule,
    HttpModule,
    MailModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
