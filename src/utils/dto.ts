import { IsDefined, IsString } from 'class-validator';

/**
 * Универсальная структура для мультиязычных данных.
 */
export class LangDto {
  @IsDefined()
  @IsString()
  ru: string;

  @IsDefined()
  @IsString()
  en: string;
}
