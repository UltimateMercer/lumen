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
  totalEnergy: number;
  energyControl: number;
  speedManipulation: number;
  mediumAffinity: number;
};

interface TableEnergyProps {
  attributes?: Attributes;
  note?: string;
}

const defaultValues = {
  totalEnergy: 0,
  energyControl: 0,
  speedManipulation: 0,
  mediumAffinity: 0,
};

export const TableEnergyComponent = ({
  attributes = defaultValues,
  note,
}: TableEnergyProps) => {
  const evaluationWeight = 0.5;
  const subtotal = () => {
    const total =
      attributes.totalEnergy *
      attributes.energyControl *
      attributes.speedManipulation *
      attributes.mediumAffinity *
      evaluationWeight;
    return Number(total.toFixed(0));
  };

  const toPercent = (n: number) => {
    return Number((n * 100).toFixed(2));
  };

  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525]">
            COMPONENTE ENERGÉTICO - Peso({evaluationWeight})
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right uppercase">
            Valor
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>1. Energia Total</TableCell>
          <TableCell className="text-right">
            {attributes.totalEnergy >= 300.0 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.totalEnergy}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>2. Controle de Energia</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.energyControl)) >= 95.0 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.energyControl} ({toPercent(attributes.energyControl)}%)
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>3. Velocidade de Manipulação</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.speedManipulation)) >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.speedManipulation} (
            {toPercent(attributes.speedManipulation)}%)
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea] h-[45px]">
          <TableCell>4. Afinidade Média</TableCell>
          <TableCell className="text-right">
            {Number(toPercent(attributes.mediumAffinity)) >= 95 && (
              <span className="inline-flex items-center gap-1 border border-[#252525] text-[#eaeaea] bg-destructive px-1 py-px text-xs font-medium uppercase ml-auto mr-2">
                <WarningIcon
                  weight="fill"
                  className="text-[#252525]!"
                  size={16}
                />
                EXCEPCIONAL
              </span>
            )}
            ~{attributes.mediumAffinity} ({toPercent(attributes.mediumAffinity)}
            % )
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
