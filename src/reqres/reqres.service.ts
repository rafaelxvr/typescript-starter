import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ReqresUserInterface } from './interfaces/reqres.interface';
import { lastValueFrom, catchError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { User } from './../user/interfaces/user.interface';
import config from '../helpers/app.config';

@Injectable()
export class ReqresService {
  private apiURL = config.reqresApiUrl;
  private readonly logger = new Logger(ReqresService.name);

  constructor(private readonly httpService: HttpService) {}

  async getUser(userId: number): Promise<User> {
    const url = `${this.apiURL}/${userId}`;
    const { data } = await lastValueFrom(
      this.httpService.get<AxiosResponse<ReqresUserInterface>>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw error.message;
        })
      )
    );
    return data.data;
  }
}
