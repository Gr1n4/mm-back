import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModService } from './mod.service';
import { ModEntity } from './entities';
import { ByIdModDto, CreateModDto, FeedModDto, UpdateModDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';

@ApiTags('ModController')
@Controller('mod')
export class ModController {
  constructor(private readonly modService: ModService) {}

  @Post()
  @FormDataRequest()
  async create(@Body() body: CreateModDto): Promise<ModEntity> {
    const mod = await this.modService.create(body);
    return new ModEntity(mod);
  }

  @Put('/:id')
  @FormDataRequest()
  async updateById(@Body() body: UpdateModDto, @Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.updateById(id, body);
    return new ModEntity(mod);
  }

  @Get('/:id')
  async getById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.getByIdOrFail(id);
    return new ModEntity(mod);
  }

  @Get()
  async feed(@Query() params: FeedModDto): Promise<ModEntity[]> {
    return this.modService.feed(params);
  }

  @Put('/likes/:id')
  async incrementLikesById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.incrementLikesById(id);
    return new ModEntity(mod);
  }

  @Put('/downloads/:id')
  async incrementDownloadsById(@Param() { id }: ByIdModDto): Promise<ModEntity> {
    const mod = await this.modService.incrementDownloadsById(id);
    return new ModEntity(mod);
  }
}
