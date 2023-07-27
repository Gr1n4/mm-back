import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModService } from './mod.service';
import { ModEntity, ModSortEntity } from './entities';
import { ByIdModDto, CreateModDto, FeedModDto, UpdateModDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';
import { Auth } from 'src/decorators/auth';
import { UserRole } from 'src/user/user.types';
import { ModSortedUpdateDto } from './dto/sorted-update.dto';
import { ModType } from './mod.types';

@ApiTags('ModController')
@Controller('mod')
export class ModController {
  constructor(private readonly modService: ModService) {}

  @Auth()
  @Post()
  @FormDataRequest()
  async create(@Body() body: CreateModDto): Promise<ModEntity> {
    const mod = await this.modService.create(body);
    return new ModEntity(mod);
  }

  @Auth()
  @Put('/:id')
  @FormDataRequest()
  async updateById(@Body() body: UpdateModDto, @Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.updateById(id, body);
    return new ModEntity(mod);
  }

  @Get()
  async feed(@Query() params: FeedModDto): Promise<ModEntity[]> {
    return this.modService.feed(params);
  }

  @Get('/sorted')
  async sortedFeed(): Promise<ModSortEntity> {
    return this.modService.sortedFeed();
  }

  @Put('/sorted/:type')
  async sortedUpdate(
    @Param('type') type: ModType,
    @Body() { modIds }: ModSortedUpdateDto,
  ): Promise<Record<string, never>> {
    await this.modService.updateSort(type, modIds);
    return {};
  }

  @Put('/likes/:id')
  async incrementLikesById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.incrementLikesById(id);
    return new ModEntity(mod);
  }

  @Put('/unlike/:id')
  async unlikesById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.decrementLikesById(id);
    return new ModEntity(mod);
  }

  @Put('/downloads/:id')
  async incrementDownloadsById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.incrementDownloadsById(id);
    return new ModEntity(mod);
  }

  @Auth(UserRole.ADMIN)
  @Delete('/:id')
  async removeById(@Param() { id }: ByIdModDto): Promise<Record<string, never>> {
    await this.modService.removeById(id);
    return {};
  }

  @Get('/:id')
  async getById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.getByIdOrFail(id);
    return new ModEntity(mod);
  }
}
