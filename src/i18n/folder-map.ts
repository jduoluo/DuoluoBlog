import { getResolvedSiteLang } from "@utils/language";
import zh from "./folders/zh.json";
import en from "./folders/en.json";

const MAPS: Record<string, Record<string, string>> = {
  zh,
  en,
};

export function getFolderDisplayName(slug: string): string {
  const lang = getResolvedSiteLang()?.split?.("-")?.[0] ?? "en";
  const map = MAPS[lang] ?? MAPS["en"];
  return map[slug] ?? slug;
}
