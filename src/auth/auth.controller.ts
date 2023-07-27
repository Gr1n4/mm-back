import { Body, Controller, Get, Post, Put, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AUTH_TOKEN } from 'src/constants';
import { Auth, AuthToken } from 'src/decorators';
import { AuthCompleteRegisterStaffDto, AuthLoginDto, AuthRegisterSuperDto } from './dto';
import { AuthEntity } from './entities';
import { UserRole } from 'src/user/user.types';
import { UserCreateDto } from 'src/user';
import { SessionDocument } from 'src/session/session.schema';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Register user.
   */
  @Post('/register-super-admin')
  async registerSuperAdmin(
    @Res({ passthrough: true }) response: any,
    @Body() credentials: AuthRegisterSuperDto,
  ): Promise<AuthEntity> {
    const result = await this.authService.registerSuperAdmin(credentials);
    response.cookie(AUTH_TOKEN, result.session.id);
    return result;
  }

  /**
   * Register staff user.
   */
  @Auth(UserRole.ADMIN)
  @Post('/register-staff')
  async registerStaff(@Body() credentials: UserCreateDto): Promise<string> {
    const result = await this.authService.registerStaff(credentials);
    return result;
  }

  /**
   * Complete register staff user.
   */
  @Post('/complete-register-staff')
  async completeRegisterStaff(
    @Res({ passthrough: true }) response: any,
    @Body() credentials: AuthCompleteRegisterStaffDto,
  ): Promise<AuthEntity> {
    const result = await this.authService.completeRegisterStaff(credentials.authId, credentials.password);
    response.cookie(AUTH_TOKEN, result.session.id);
    return result;
  }

  /**
   * Login user.
   */
  @Post('/login')
  async login(@Res({ passthrough: true }) response: any, @Body() credentials: AuthLoginDto): Promise<AuthEntity> {
    const result = await this.authService.login(credentials);
    response.cookie(AUTH_TOKEN, result.session.id);
    return result;
  }

  /**
   * Get user and session by auth token in cookie
   */
  @Auth()
  @Get('/profile')
  async getProfile(@Session() session: SessionDocument): Promise<AuthEntity> {
    return new AuthEntity({ session });
  }

  /**
   * Mark session as expired and clear auth token cookie.
   */
  @Put('/logout')
  async logout(@Res({ passthrough: true }) response: any, @AuthToken() authToken: string): Promise<boolean> {
    try {
      await this.authService.logout(authToken);
      response.clearCookie(AUTH_TOKEN);
      return true;
    } catch (e) {
      return false;
    }
  }
}
