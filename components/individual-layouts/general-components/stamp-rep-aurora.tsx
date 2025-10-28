import { StarIcon } from "@phosphor-icons/react";

export const StampRepAurora = () => {
  return (
    <div className="flex gap-2 items-center justify-between dark:bg-[#eaeaea] bg-[#252525] py-3 px-6 text-center mt-4 texture-item">
      <div
        className="dark:text-[#121212] text-[#eaeaea]
          inline-flex items-center gap-2"
      >
        <StarIcon weight="fill" size={16} className="" />
        <StarIcon weight="fill" size={20} className="" />
        <StarIcon weight="fill" size={24} className="" />
      </div>
      <div className="">
        <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
          República da Aurora
        </div>
      </div>

      <div
        className="dark:text-[#121212] text-[#eaeaea]
          inline-flex items-center gap-2"
      >
        <StarIcon weight="fill" size={24} className="" />
        <StarIcon weight="fill" size={20} className="" />
        <StarIcon weight="fill" size={16} className="" />
      </div>
    </div>
  );
};
