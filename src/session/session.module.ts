import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModel, SessionSchema } from './session.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SessionModel.name, schema: SessionSchema }])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
