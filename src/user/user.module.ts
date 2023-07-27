import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { SessionModule } from 'src/session';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]), forwardRef(() => SessionModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
