import { ModType } from '../mod.types';
import { SortModDocument } from '../sort-mod.schema';
import { ModEntity } from './mod.entity';

const findByType = (sortMods: SortModDocument[], type: ModType): ModEntity[] => {
  return sortMods.find((sortMod) => sortMod.type === type)?.mods.map((mod) => new ModEntity(mod)) ?? [];
};

export class ModSortEntity {
  [ModType.MOD]: ModEntity[];
  [ModType.SEED]: ModEntity[];
  [ModType.SKIN]: ModEntity[];
  [ModType.MAP]: ModEntity[];

  constructor(sortMods: SortModDocument[]) {
    this.MOD = findByType(sortMods, ModType.MOD);
    this.SEED = findByType(sortMods, ModType.SEED);
    this.SKIN = findByType(sortMods, ModType.SKIN);
    this.MAP = findByType(sortMods, ModType.MAP);
  }
}
