import type { DateProps } from "@/utils/interfaces";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

const FormatDate = ({ date, locale = "en-us" }: DateProps) => {
  return format(new Date(date), "dd MMM yyyy", {
    locale: locale === "en-us" ? enUS : ptBR,
  });
};

const FormatFullDate = ({ date, locale = "en-us" }: DateProps) => {
  const localePattern =
    locale === "en-us" ? "MMMM dd yyyy" : "dd 'de' MMMM 'de' yyyy";
  return format(new Date(date), localePattern, {
    locale: locale === "en-us" ? enUS : ptBR,
  });
};

const FormatFullTimeStamp = ({ date, locale = "en-us" }: DateProps) => {
  const localePattern =
    locale === "en-us"
      ? "MMMM dd yyyy', at' H:mm"
      : "dd 'de' MMMM 'de' yyyy', às' H:mm";

  return format(new Date(date), localePattern, {
    locale: locale === "en-us" ? enUS : ptBR,
  });
};

const FormatMonthYear = ({ date, locale = "en-us" }: DateProps) => {
  return format(new Date(date), "MMM yyyy", {
    locale: locale === "en-us" ? enUS : ptBR,
  });
};

export { FormatDate, FormatFullDate, FormatFullTimeStamp, FormatMonthYear };
