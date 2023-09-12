import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModModel, ModDocument } from './mod.schema';
import { Model } from 'mongoose';
import { CreateModDto, FeedModDto, UpdateModDto } from './dto';
import { ModEntity, ModSortEntity } from './entities';
import { FileService } from 'src/file';
import { PictureService } from 'src/picture';
import { ModType } from './mod.types';
import { SortModDocument, SortModModel } from './sort-mod.schema';

@Injectable()
export class ModService {
  constructor(
    @InjectModel(ModModel.name) private readonly modModel: Model<ModModel>,
    @InjectModel(SortModModel.name) private readonly sortModModel: Model<SortModModel>,
    private readonly fileService: FileService,
    private readonly pictureService: PictureService,
  ) {}

  async create({
    name,
    desc,
    videoUrl,
    type,
    version,
    cost,
    isNew,
    isRewarded,
    isRewardedEng,
    priority,
    generationKey,
    tags,
    file,
    picture,
  }: CreateModDto): Promise<ModDocument> {
    let _file = null;
    let _picture = null;
    if (type === ModType.SEED) {
      _picture = await this.pictureService.create(picture);
    } else {
      [_file, _picture] = await Promise.all([this.fileService.create(file), this.pictureService.create(picture)]);
    }
    const mod = await this.modModel.create({
      name,
      desc,
      videoUrl,
      type,
      version,
      cost,
      isNew,
      isRewarded,
      isRewardedEng,
      priority,
      generationKey,
      tags,
      file: _file ? _file._id : null,
      picture: _picture._id,
    });
    const { _id } = mod;
    const sortMods = await this.getSortedByType(type);
    if (sortMods) {
      sortMods.mods.unshift(mod);
      await sortMods.save();
    } else {
      await this.sortModModel.create({ type, mods: [mod] });
    }
    return this.getByIdOrFail(_id.toString());
  }

  async updateById(id: string, { file, picture, ...data }: UpdateModDto): Promise<ModDocument> {
    console.log('data: %o', data);
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
    return list.map((item) => new ModEntity(item));
  }

  async sortedFeed(): Promise<ModSortEntity> {
    const sortMods = await this.sortModModel
      .find()
      .populate('mods')
      .populate({
        path: 'mods',
        populate: {
          path: 'file',
        },
      })
      .populate({
        path: 'mods',
        populate: {
          path: 'picture',
        },
      })
      .exec();
    return new ModSortEntity(sortMods);
  }

  async getSortedByType(type: ModType): Promise<SortModDocument> {
    return this.sortModModel.findOne({ type }).exec();
  }

  async updateSort(type: ModType, sortedIds: string[]): Promise<SortModDocument> {
    return this.sortModModel
      .findOneAndUpdate({ type }, { type, mods: sortedIds }, { upsert: true, setDefaultsOnInsert: true })
      .exec();
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

  async decrementLikesById(id: string): Promise<ModDocument> {
    const mod = await this.getByIdOrFail(id);
    mod.likes--;
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

  async removeById(id: string): Promise<void> {
    await this.modModel.findOneAndRemove({ _id: id }).exec();
  }
}
