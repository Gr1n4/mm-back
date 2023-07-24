export const LangModel = {
  en: { type: String },
  ru: { type: String },
} as const;

export interface LangModelType {
  en: string;
  ru: string;
}
