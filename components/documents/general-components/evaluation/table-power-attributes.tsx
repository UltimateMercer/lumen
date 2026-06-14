import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TablePowerAttributesProps {
  attributes: {
    energyControl: number;
    speedManipulation: number;
    mediumAffinity: number;
    strength: number;
    physicalSpeed: number;
    durability: number;
    stamina: number;
  };
  convertedTotalEnergyNote: number;
  subtotal: number;
  note?: string;
}

const defaultAttributes = {
  energyControl: 0,
  speedManipulation: 0,
  mediumAffinity: 0,
  strength: 0,
  physicalSpeed: 0,
  durability: 0,
  stamina: 0,
};

export const TablePowerAttributes = ({
  attributes = defaultAttributes,
  convertedTotalEnergyNote = 0,
  subtotal = 0,
  note,
}: TablePowerAttributesProps) => {
  return (
    <>
      <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
        <TableHeader className="">
          <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
            <TableHead className="text-[#eaeaea] dark:text-[#252525]">
              COMPONENTE
            </TableHead>
            <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right">
              NOTA (0 - 100)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>1. Energia Total</TableCell>
            <TableCell className="text-right">
              {convertedTotalEnergyNote}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>2. Controle de Energia</TableCell>
            <TableCell className="text-right">
              {attributes.energyControl}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>3. Velocidade de Manipulação</TableCell>
            <TableCell className="text-right">
              {attributes.speedManipulation}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>4. Afinidade Média</TableCell>
            <TableCell className="text-right">
              {attributes.mediumAffinity}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>5. Força</TableCell>
            <TableCell className="text-right">{attributes.strength}</TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>6. Velocidade Física</TableCell>
            <TableCell className="text-right">
              {attributes.physicalSpeed}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>7. Durabilidade</TableCell>
            <TableCell className="text-right">
              {attributes.durability}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
            <TableCell>8. Stamina</TableCell>
            <TableCell className="text-right">{attributes.stamina}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="border-t border-[#252525] dark:border-[#eaeaea] bg-[#252525] dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea]">
            <TableCell className="text-[#eaeaea] dark:text-[#252525]">
              SUBTOTAL - ATRIBUTOS DE PODER
            </TableCell>
            <TableCell className="text-[#eaeaea] dark:text-[#252525] text-right">
              {subtotal}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
