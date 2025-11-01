import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { BaseLayout } from "@/components/base-layout";
import { FiltersDefs } from "@/components/filters-defs";
import { Html } from "@/components/html";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  display: "swap",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REDE LUMEN - SISTEMA DE ACESSO",
  description: "Sistema de Acesso aos Arquivo da Rede Lumen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Html>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${playfairDisplay.variable} bg-[#eaeaea] dark:bg-[#252525] font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <BaseLayout>{children}</BaseLayout>
          <div
            id="padding"
            className="lg:block hidden w-full h-full p-[8px] fixed z-[2] top-0 left-0 pointer-events-none"
          >
            <div className="w-full h-full border border-[#121212] dark:border-[#eaeaea]"></div>
          </div>
          <div
            id="frame"
            className="lg:block hidden w-full h-screen fixed top-0 right-0 z-[3] background-frame "
          ></div> */}
        </ThemeProvider>
      </body>
    </Html>
  );
}
