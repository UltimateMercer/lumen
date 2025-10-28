import { WrenchIcon, type IconProps } from "@phosphor-icons/react";
import type React from "react";

import { cardStyles } from "@/utils/styles";

type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
type MenuCard = {
  title: string;
  description: string;
  icon: IconComponent;
  count?: number | string;
  url: string;
};

interface MenuCardProps {
  data: MenuCard;
}

export const MenuCard = ({ data }: MenuCardProps) => {
  const Icon = data.icon;
  return (
    <a href={data.url} className={cardStyles()}>
      <div className="absolute top-12 right-12">
        {data.count && data.count !== 0 && (
          <div className="bg-[#f44336] text-[#f7f7f7] text-lg font-bold w-8 h-8 flex items-center justify-center rounded">
            {data.count}
          </div>
        )}
        {data.url === "#" && (
          <div className="bg-[#f44336] text-[#f7f7f7] text-lg font-bold h-8 flex items-center justify-center rounded px-2">
            <WrenchIcon weight="bold" size={18} />
          </div>
        )}
      </div>
      <div className="my-12">
        <Icon className="mx-auto" size={125} weight="bold" />
      </div>
      <h4 className="text-3xl font-bold mb-2.5">{data.title}</h4>
      <p className="font-medium text-sm tracking-wide">{data.description}</p>
    </a>
  );
};
