import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModModel, ModSchema } from './mod.schema';
import { ModService } from './mod.service';
import { ModController } from './mod.controller';
import { FileModule } from 'src/file';
import { PictureModule } from 'src/picture';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModModel.name, schema: ModSchema }]),
    FileModule,
    PictureModule,
    NestjsFormDataModule,
  ],
  controllers: [ModController],
  providers: [ModService],
})
export class ModModule {}
