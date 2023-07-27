import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { ModType } from 'src/mod/mod.types';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:type')
  async loadFromFiles(@Param('type') type: ModType): Promise<Record<string, never>> {
    await this.taskService.loadFromFiles(type);
    return {};
  }
}
