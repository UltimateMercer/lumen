"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="inline-block h-5 w-5" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-xs uppercase tracking-widest text-muted-foreground hover:text-amber-crt"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
