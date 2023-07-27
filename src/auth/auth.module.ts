import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthModel, AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user';
import { SessionModule } from 'src/session';

@Module({
  imports: [MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]), UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
