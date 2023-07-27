import { ModModule } from 'src/mod/mod.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ModModule, HttpModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
