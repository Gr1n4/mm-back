import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModModel, ModDocument } from './mod.schema';
import { Model } from 'mongoose';
import { CreateModDto, FeedModDto, UpdateModDto } from './dto';
import { ModEntity } from './entities';
import { FileService } from 'src/file';
import { PictureService } from 'src/picture';

@Injectable()
export class ModService {
  constructor(
    @InjectModel(ModModel.name) private readonly modModel: Model<ModModel>,
    private readonly fileService: FileService,
    private readonly pictureService: PictureService,
  ) {}

  async create({
    name,
    desc,
    videoUrl,
    version,
    cost,
    isNew,
    isRevarded,
    isRevardedEng,
    priority,
    file,
    picture,
  }: CreateModDto): Promise<ModDocument> {
    const [_file, _picture] = await Promise.all([this.fileService.create(file), this.pictureService.create(picture)]);
    const { _id } = await this.modModel.create({
      name,
      desc,
      videoUrl,
      version,
      cost,
      isNew,
      isRevarded,
      isRevardedEng,
      priority,
      file: _file._id,
      picture: _picture._id,
    });
    return this.getByIdOrFail(_id.toString());
  }

  async updateById(id: string, { file, picture, ...data }: UpdateModDto): Promise<ModDocument> {
    const newData = { ...data };
    if (file) {
      const fileMode = await this.fileService.create(file);
      // @ts-ignore
      newData.file = fileMode._id;
    }
    if (picture) {
      const pictureModel = await this.pictureService.create(picture);
      // @ts-ignore
      newData.picture = pictureModel._id;
    }
    await this.modModel.updateOne({ _id: id }, newData);
    return this.getByIdOrFail(id);
  }

  async feed({ name }: FeedModDto): Promise<ModEntity[]> {
    const list = await this.modModel.find().populate('file').populate('picture').sort({ priority: 'desc' }).exec();
    console.log('list: %o', list);
    return list.map((item) => new ModEntity(item));
  }

  async incrementDownloadsById(id: string): Promise<ModDocument> {
    const mod = await this.getByIdOrFail(id);
    mod.downloads++;
    return mod.save();
  }

  async incrementLikesById(id: string): Promise<ModDocument> {
    const mod = await this.getByIdOrFail(id);
    mod.likes++;
    return mod.save();
  }

  async getByIdOrFail(id: string): Promise<ModDocument> {
    const mod = await this.getById(id);
    if (mod === null) {
      throw new NotFoundException('Mode with this id not found');
    }
    return mod;
  }

  async getById(id: string): Promise<ModDocument | null> {
    return this.modModel.findById(id).populate('file').populate('picture').exec();
  }
}
