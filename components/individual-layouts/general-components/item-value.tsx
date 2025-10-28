import { RedactedText } from "@/components/redacted-text";
import { cn } from "@/lib/utils";

export const ItemValue = ({
  item,
  value,
  className,
  redacted = false,
}: {
  item: string;
  value: string;
  className?: string;
  redacted?: boolean;
}) => {
  return (
    <div className={cn(className)}>
      <span className="text-muted-foreground uppercase">{item}: </span>
      <span className="font-bold uppercase">
        <RedactedText redacted={redacted}>{value}</RedactedText>
      </span>
    </div>
  );
};
