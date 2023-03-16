import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReqresService } from './reqres.service';

@Module({
  imports: [HttpModule],
  providers: [ReqresService],
  exports: [ReqresService]
})
export class ReqresModule {}
