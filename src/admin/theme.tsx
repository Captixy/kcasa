import { createContext, useContext, useState } from "react";

export interface AdminTheme {
  mode: "dark" | "light";
  toggle: () => void;
  bg: string;
  surface: string;
  raised: string;
  text: string;
  muted: string;
  faint: string;
  border: string;
  accent: string;
  accentDeep: string;
  accentBg: string;
  accentBorder: string;
  shadow: string;
  danger: string;
}

const DARK: Omit<AdminTheme, "mode" | "toggle"> = {
  bg:          "oklch(0.15 0.01 250)",
  surface:     "oklch(0.18 0.01 250)",
  raised:      "oklch(0.22 0.01 250)",
  text:        "oklch(0.96 0.01 80)",
  muted:       "oklch(0.85 0.01 80 / 0.75)",
  faint:       "oklch(0.72 0.01 80 / 0.55)",
  border:      "oklch(0.55 0.13 65 / 0.18)",
  accent:      "oklch(0.78 0.14 75)",
  accentDeep:  "oklch(0.68 0.15 65)",
  accentBg:    "oklch(0.55 0.13 65 / 0.12)",
  accentBorder:"oklch(0.6 0.13 65 / 0.25)",
  shadow:      "none",
  danger:      "oklch(0.65 0.2 25)",
};

const LIGHT: Omit<AdminTheme, "mode" | "toggle"> = {
  bg:          "oklch(0.93 0.008 75)",
  surface:     "oklch(1 0 0)",
  raised:      "oklch(0.96 0.006 75)",
  text:        "oklch(0.16 0.01 250)",
  muted:       "oklch(0.35 0.02 250)",
  faint:       "oklch(0.55 0.01 250)",
  border:      "oklch(0.87 0.012 75)",
  accent:      "oklch(0.62 0.15 65)",
  accentDeep:  "oklch(0.55 0.16 65)",
  accentBg:    "oklch(0.68 0.15 65 / 0.1)",
  accentBorder:"oklch(0.68 0.15 65 / 0.35)",
  shadow:      "0 1px 6px oklch(0.4 0.01 250 / 0.08)",
  danger:      "oklch(0.52 0.2 25)",
};

const ThemeContext = createContext<AdminTheme>({ mode: "dark", toggle: () => {}, ...DARK });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">(
    () => (localStorage.getItem("kcasa_admin_theme") as "dark" | "light") ?? "dark"
  );

  const toggle = () => {
    const next: "dark" | "light" = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("kcasa_admin_theme", next);
  };

  const tokens = mode === "dark" ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ mode, toggle, ...tokens }}>
      {children}
    </ThemeContext.Provider>
  );
}
