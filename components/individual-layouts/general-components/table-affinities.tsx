import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WarningIcon } from "@phosphor-icons/react";

type Attributes = {
  chakra: number;
  mana: number;
  spectral: number;
};

interface TableAffinitiesProps {
  attributes?: Attributes;
  note?: string;
}

const defaultValues = {
  chakra: 0,
  mana: 0,
  spectral: 0,
};

export const TableAffinitiesComponent = ({
  attributes = defaultValues,
  note,
}: TableAffinitiesProps) => {
  const toPercent = (n: number) => {
    return Number((n * 100).toFixed(2));
  };

  const calcMediumAffinity = () => {
    const total =
      (attributes.chakra + attributes.mana + attributes.spectral) / 3;
    return Number(total.toFixed(3));
  };

  const mediumAffinity = calcMediumAffinity();
  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525]">
            Afinidades energéticas
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right uppercase">
            Valor
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Chakra</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.chakra)) >= 95.0 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.chakra} ({toPercent(attributes.chakra)}%)
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Mana</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.mana)) >= 95.0 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.mana} ({toPercent(attributes.mana)}%)
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Espectral</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.spectral)) >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.spectral} ({toPercent(attributes.spectral)}%)
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea] h-[45px]">
          <TableCell>Afinidade Média</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(mediumAffinity)) >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{mediumAffinity} ({toPercent(mediumAffinity)}%)
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
