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
          {/* <div className="text-sm">
            <span className="text-muted-foreground uppercase">
              Assinatura:{" "}
            </span>
            <span className="font-bold uppercase underline  underline-offset-2">
              {data.signature}
            </span>
            <span className="text-muted-foreground uppercase ml-2">
              [Assinatura Digital]
            </span>
          </div> */}
          <div className="">
            <span className="text-sm text-muted-foreground uppercase">
              Assinatura:{" "}
            </span>
            <div className="flex items-center justify-between bg-muted-foreground/5 background-texture h-28">
              <div className="min-h-20 border border-[#252525] dark:border-[#eaeaea] mx-auto py-1 px-2">
                <p className="text-[10px] uppercase">
                  Documento assinado digitalmente
                </p>
                <p className="text-sm font-bold uppercase">{data.signature}</p>
                <p className="text-xs uppercase">{data.registry}</p>
                <p className="text-xs uppercase">60·Vernis·1243·S · 14:42:19</p>
              </div>
            </div>
            {/* <div className="h-20 w-24 bg-blue-500 mx-auto"></div> */}
            <div className="flex flex-nowrap items-center">
              <div className="w-full h-px bg-muted-foreground"></div>
              <span className="block text-sm text-muted-foreground uppercase text-nowrap">
                [Assinatura Digital]
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
