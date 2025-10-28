export interface LanguageStore {
  language: "pt-br" | "en-us";
  setLanguage: (language: string) => void;
}

export interface DateProps {
  date: string;
  locale?: "pt-br" | "en-us";
}
