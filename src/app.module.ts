import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReqresModule } from './reqres/reqres.module';
import { MailModule } from './email/email.module';
import config from './helpers/app.config';
@Module({
  imports: [
    ReqresModule,
    UserModule,
    MailModule,
    MongooseModule.forRoot(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
