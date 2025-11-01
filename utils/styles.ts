import { cn } from "@/lib/utils";

export const btnStyles = (rules?: string) => {
  return cn(
    "flex gap-1 justify-center items-center w-16 h-12 px-4 hover:bg-[#252525] dark:hover:bg-[#eaeaea] text-[#252525] hover:text-[#eaeaea] dark:text-[#eaeaea] dark:hover:text-[#252525] rounded-br-xs cursor-pointer",
    rules ?? ""
  );
};

export const brandBtnStyles = (rules?: string) => {
  return cn(
    "flex gap-2 group justify-center items-center h-12 border-[#121212] dark:border-custom-brown px-4 hover:bg-[#121212] dark:hover:bg-[#cfc0a0] hover:text-[#f7f7f7] dark:hover:text-[#121212] cursor-pointer font-bold tracking-wider rounded-bl-xs",
    rules ?? ""
  );
};

export const cardStyles = (rules?: string) => {
  return cn(
    "flex flex-col relative w-full rounded-xs bg-custom-brown dark:bg-[#252525] hover:bg-[#252525] dark:hover:bg-custom-brown p-12 text-[#121212] dark:text-custom-brown-text hover:text-custom-brown-text dark:hover:text-[#121212] cursor-pointer",
    rules ?? ""
  );
};

export const projectCardStyles = (rules?: string) => {
  return cn(
    "flex flex-col relative w-full rounded-2xl bg-custom-brown dark:bg-[#252525] hover:bg-[#252525] dark:hover:bg-custom-brown p-12 cursor-pointer",
    rules ?? ""
  );
};

export const tickerItemStyles = (rules?: string) => {
  return cn(
    "flex items-center gap-3 hover:bg-[#121212] dark:hover:bg-[#d4c299] hover:text-[#f7f7f7] text-[#121212] dark:text-[#f7f7f7] dark:hover:text-[#121212] cursor-pointer",
    rules ?? ""
  );
};
