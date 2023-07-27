import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModel, SessionSchema } from './session.schema';
import { UserModule } from 'src/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SessionModel.name, schema: SessionSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
