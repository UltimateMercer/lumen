import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Attributes = {
  survivanceAndFirstAid: number;
  strategySkills: number;
  teamwork: number;
  historyAndGeography: number;
};

interface TableAdditionalTestProps {
  attributes?: Attributes;
  note?: string;
}

const defaultValues: Attributes = {
  survivanceAndFirstAid: 0,
  strategySkills: 0,
  teamwork: 0,
  historyAndGeography: 0,
};

export const TableAdditionalTest = ({
  attributes = defaultValues,
  note,
}: TableAdditionalTestProps) => {
  const subtotal = () => {
    const total =
      attributes?.survivanceAndFirstAid +
      attributes?.strategySkills +
      attributes?.teamwork +
      attributes?.historyAndGeography;
    return total;
  };
  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525]">
            PROVAS TEÓRICAS E PRÁTICAS
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right">
            NOTA (0 - 100)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>9. Primeiros Socorros & Sobrevivência</TableCell>
          <TableCell className="text-right">
            {attributes.survivanceAndFirstAid}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>10. Habilidades Estratégicas</TableCell>
          <TableCell className="text-right">
            {attributes.strategySkills}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>11. Cooperação e Trabalho em Equipe</TableCell>
          <TableCell className="text-right">{attributes.teamwork}</TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell>12. História e Geografia</TableCell>
          <TableCell className="text-right">
            {attributes.historyAndGeography}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="border-t border-[#252525] dark:border-[#eaeaea] bg-[#252525] dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea]">
          <TableCell className="text-[#eaeaea] dark:text-[#252525]">
            SUBTOTAL - PROVAS ADICIONAIS
          </TableCell>
          <TableCell className="text-[#eaeaea] dark:text-[#252525] text-right">
            {subtotal()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
