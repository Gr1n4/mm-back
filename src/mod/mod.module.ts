import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModModel, ModSchema } from './mod.schema';
import { ModService } from './mod.service';
import { ModController } from './mod.controller';
import { FileModule } from 'src/file';
import { PictureModule } from 'src/picture';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { SessionModule } from 'src/session';
import { SortModModel, SortModSchema } from './sort-mod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModModel.name, schema: ModSchema },
      { name: SortModModel.name, schema: SortModSchema },
    ]),
    FileModule,
    PictureModule,
    NestjsFormDataModule,
    SessionModule,
  ],
  controllers: [ModController],
  providers: [ModService],
  exports: [ModService],
})
export class ModModule {}
