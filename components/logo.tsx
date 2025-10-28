import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string; // caso queira passar mais estilos
}

export const Logo: React.FC<LogoProps> = ({
  width = 56,
  height = 56,
  alt = "logo",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Tema claro, normal */}
      <Image
        src="/images/ultimate-logo-dark.svg"
        alt={alt}
        width={width}
        height={height}
        className="block dark:hidden group-hover:hidden"
      />

      {/* Tema claro, hover */}
      <Image
        src="/images/ultimate-logo-red.svg"
        alt={alt}
        width={width}
        height={height}
        className="hidden dark:hidden group-hover:block"
      />

      {/* Tema escuro, normal */}
      <Image
        src="/images/ultimate-logo-red.svg"
        alt={alt}
        width={width}
        height={height}
        className="hidden dark:block dark:group-hover:hidden"
      />

      {/* Tema escuro, hover */}
      <Image
        src="/images/ultimate-logo-dark.svg"
        alt={alt}
        width={width}
        height={height}
        className="hidden dark:group-hover:block"
      />
    </div>
  );
};
