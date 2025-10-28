type ResponsibleSignature = {
  department: string;
  name: string;
  registry: string;
  signature: string;
};
interface ResponsibleSignatureProps {
  responsibleSignatures: ResponsibleSignature[];
}

export const ResponsibleSignatures = ({
  responsibleSignatures,
}: ResponsibleSignatureProps) => {
  return (
    <>
      {responsibleSignatures.map((data, index) => (
        <div key={index} className="flex flex-col gap-1 mb-2.5">
          <h4 className="uppercase text-lg font-bold">{data.department}</h4>
          <div className="text-sm">
            <span className="text-muted-foreground">NOME: </span>
            <span className="font-bold uppercase">{data.name}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground uppercase">Registro: </span>
            <span className="font-bold uppercase">{data.registry}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground uppercase">
              Assinatura:{" "}
            </span>
            <span className="font-bold uppercase underline  underline-offset-2">
              {data.signature}
            </span>
            <span className="text-muted-foreground uppercase ml-2">
              [Assinatura Digital]
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
