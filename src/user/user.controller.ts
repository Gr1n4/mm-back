import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Auth } from 'src/decorators';
import { UserRole } from './user.types';
import { UserFeedDto } from './dto';
import { UserEntity } from './entities';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(UserRole.ADMIN)
  @Get()
  async search(@Query() params: UserFeedDto): Promise<UserEntity[]> {
    const users = await this.userService.feed(params);
    return users.map((user) => new UserEntity(user));
  }
}
