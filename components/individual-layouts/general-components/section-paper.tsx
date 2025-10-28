import { cn } from "@/lib/utils";

export const SectionPaper = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "border-b border-[#252525] dark:border-[#eaeaea] pb-4 mb-4",
        className
      )}
    >
      {children}
    </div>
  );
};
