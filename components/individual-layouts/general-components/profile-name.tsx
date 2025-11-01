import { RedactedText } from "@/components/redacted-text";

export const ProfileName = ({
  name,
  knownAs,
  isHighSecurity = false,
}: {
  name: string;
  knownAs: string;
  isHighSecurity?: boolean;
}) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-foreground uppercase">
        Perfil:
        <RedactedText redacted={isHighSecurity}>{name}</RedactedText>
      </h2>
      {knownAs && (
        <div className="text-muted-foreground uppercase mt-1 mb-2">
          Conhecido como: <span className="font-bold ">{knownAs}</span>{" "}
        </div>
      )}
    </div>
  );
};
