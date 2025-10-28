import React from "react";
export const RedactedText = ({
  children,
  redacted = true,
}: {
  children: React.ReactNode;
  redacted?: boolean;
}) => {
  if (redacted) {
    const text = React.Children.toArray(children).join("");
    // Mantém o tamanho exato e preserva espaços
    const redactedText = text
      .split("")
      .map((char) => (char === " " ? " " : "█"))
      .join("");

    return (
      <span className="text-foreground select-none font-mono whitespace-pre">
        {redactedText}
      </span>
    );
  }
  return <span>{children}</span>;
};
