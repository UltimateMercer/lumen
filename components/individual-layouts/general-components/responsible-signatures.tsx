import { DigitalSignature } from "./digital-signature";

type ResponsibleSignature = {
  department: string;
  name: string;
  registry: string;
  signature: string;
  timestamp: string;
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
        <div key={index} className="flex flex-col gap-1">
          <h4 className="uppercase text-lg font-bold">{data.department}</h4>
          <div className="text-sm">
            <span className="text-muted-foreground">NOME: </span>
            <span className="font-bold uppercase">{data.name}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground uppercase">Registro: </span>
            <span className="font-bold uppercase">{data.registry}</span>
          </div>
          <DigitalSignature
            signature={data.signature}
            registry={data.registry}
            timestamp={data.timestamp}
          />
        </div>
      ))}
    </>
  );
};
