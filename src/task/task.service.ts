import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import fetch from 'node-fetch';
import { ModService } from 'src/mod/mod.service';
import { ModType } from 'src/mod/mod.types';

// @ts-ignore
// const fetch = <T extends any[]>(...args: T) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const mapTypeFolder = {
  [ModType.SKIN]: 'skins',
  [ModType.SEED]: 'seeds',
  [ModType.MOD]: 'mods',
  [ModType.MAP]: 'maps',
};

function getJsonUrlByType(type: ModType): string {
  return `http://u1443067.cp.regruhosting.ru/${mapTypeFolder[type]}/main.json`;
}

function getImgUrlByType(type: ModType, name: string): string {
  return `http://u1443067.cp.regruhosting.ru/${mapTypeFolder[type]}/${name}`;
}

function getFileUrlByType(type: ModType, name): string {
  return `http://u1443067.cp.regruhosting.ru/${mapTypeFolder[type]}/${name}`;
}

@Injectable()
export class TaskService {
  constructor(private readonly modService: ModService, private readonly httpService: HttpService) {}

  async loadFromFiles(type: ModType): Promise<void> {
    const jsonRes = await this.httpService.get(getJsonUrlByType(type), { responseType: 'json' }).toPromise();
    // console.log('jsonRes: %o', jsonRes);
    // const json: any = await jsonRes.json();
    console.log('json: %o', jsonRes.data);
    const json = typeof jsonRes.data === 'object' ? jsonRes.data : JSON.parse(jsonRes.data);
    for (const addon of json.addons) {
      const pictureRes = await this.httpService
        .get(getImgUrlByType(type, addon.imagePath), { responseType: 'arraybuffer' })
        .toPromise();
      const picture = {
        originalName: addon.imagePath.split('/')[1],
        buffer: Buffer.from(pictureRes.data, 'binary'),
        size: Number(pictureRes.headers['content-length']),
      };
      // console.log('picture: %o', picture);
      const createModData = {
        type,
        name: { en: addon.engName, ru: addon.name },
        desc: { en: addon.engDesc, ru: addon.desc },
        videoUrl: { en: addon.videoUrlEng, ru: addon.videoUrl },
        cost: addon.cost,
        version: addon.version,
        tags: [addon.tags],
        isNew: addon.isNew,
        isRewarded: addon.isRewarded,
        isRewardedEng: addon.isRewardedEng,
        picture,
      };
      if (type !== ModType.SEED) {
        const fileRes = await this.httpService
          .get(getFileUrlByType(type, addon.fileName), { responseType: 'arraybuffer' })
          .toPromise();
        console.log('blob: %o', typeof fileRes.data);
        const file = {
          originalName: addon.fileName,
          buffer: Buffer.from(fileRes.data, 'binary'),
          size: Number(fileRes.headers['content-length']),
          extension: addon.fileName.split('.')[1],
          mimeType: addon.fileName.split('.')[1],
        };
        // @ts-ignore
        createModData.file = file;
      } else {
        // @ts-ignore
        createModData.generationKey = addon.fileName;
      }
      // console.log('modData: %o', createModData);
      // @ts-ignore
      await this.modService.create(createModData);
    }
  }
}
