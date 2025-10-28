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
  strength: number;
  physicalSpeed: number;
  durability: number;
  stamina: number;
};

interface TablePhysicalProps {
  attributes?: Attributes;
  note?: string;
}

const defaultValues = {
  strength: 0,
  physicalSpeed: 0,
  durability: 0,
  stamina: 0,
};

export const TablePhysicalComponent = ({
  attributes = defaultValues,
  note,
}: TablePhysicalProps) => {
  const evaluationWeight = 0.5;
  const mediumValue =
    (attributes.strength +
      attributes.physicalSpeed +
      attributes.durability +
      attributes.stamina) /
    4;
  const subtotal = () => {
    console.log(mediumValue);
    const total = mediumValue * 100 * evaluationWeight;
    return Number(total.toFixed(0));
  };

  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525]">
            COMPONENTE FÍSICO - Peso({evaluationWeight})
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right uppercase">
            Valor/Escala
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Força</TableCell>
          <TableCell className="text-right">
            {attributes.strength >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            {attributes.strength}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Velocidade</TableCell>
          <TableCell className="text-right">
            {attributes.physicalSpeed >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            {attributes.physicalSpeed}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>Durabilidade</TableCell>
          <TableCell className="text-right">
            {attributes.durability >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-0.25 text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            {attributes.durability}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea] h-[45px]">
          <TableCell>Stamina</TableCell>
          <TableCell className="text-right">
            {attributes.stamina >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-0.25 text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.stamina}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="border-t border-[#252525] dark:border-[#eaeaea] bg-[#252525] dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea]">
          <TableCell className="text-[#eaeaea] dark:text-[#252525] uppercase">
            Resultado
          </TableCell>
          <TableCell className="text-[#eaeaea] dark:text-[#252525] text-right">
            {subtotal()} pontos
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
