import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, AuthModel } from './auth.schema';
import { Option } from 'src/types';
import { SessionService } from 'src/session';
import { UserService } from 'src/user/user.service';
import { UserCreateDto } from 'src/user';
import { AuthLoginDto, AuthRegisterSuperDto } from './dto';
import { AuthEntity } from './entities';
import { UserRole } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async login({ email, password }: AuthLoginDto): Promise<AuthEntity> {
    const user = await this.userService.getByEmail(email);
    console.log('user: %o', user);
    if (user === null || !user.isPasswordEqual(password)) {
      throw new BadRequestException('Bad login or password');
    }
    const session = await this.sessionService.create(user.id);
    return new AuthEntity({ session });
  }

  async registerSuperAdmin(data: AuthRegisterSuperDto): Promise<AuthEntity> {
    const { email } = data;
    const existUser = await this.userService.getByEmail(email);
    if (existUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const superAdmin = await this.userService.findOne({ role: UserRole.SUPER_ADMIN });
    if (superAdmin) {
      throw new BadRequestException('Super Admin already exists');
    }
    const user = await this.userService.createWithPassword({ ...data, role: UserRole.SUPER_ADMIN });
    const session = await this.sessionService.create(user.id);
    return new AuthEntity({ session });
  }

  async registerStaff(data: UserCreateDto): Promise<string> {
    const { email } = data;
    const existUser = await this.userService.getByEmail(email);
    if (existUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = await this.userService.create(data);
    const auth = await this.authModel.create({ user });
    user.auth = auth;
    await user.save();
    return auth.id;
  }

  async completeRegisterStaff(authId: string, password: string): Promise<AuthEntity> {
    const auth = await this.getByIdOrFail(authId);
    auth.user.password = password;
    auth.user.auth = null;
    auth.user.isActive = true;
    auth.isCompleted = true;
    await auth.save();
    const user = await auth.user.save();
    const session = await this.sessionService.create(user._id.toString());
    return new AuthEntity({ session });
  }

  async logout(sessionId: string): Promise<void> {
    const session = await this.sessionService.getById(sessionId);
    if (session) {
      session.isExpired = true;
      await session.save();
    }
  }

  getById(id: string): Promise<Option<AuthDocument>> {
    return this.authModel.findById(id).populate('user').exec();
  }

  async getByIdOrFail(id: string): Promise<AuthDocument> {
    const auth = await this.getById(id);
    if (!auth) {
      throw new NotFoundException('Auth with this id not found');
    }
    return auth;
  }
}
