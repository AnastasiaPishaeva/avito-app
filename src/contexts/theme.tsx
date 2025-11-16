import { createContext, type ReactNode, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


declare module "@mui/material/styles" {
  interface Palette {
    purple: {
      light: string;
    };
  }
  interface PaletteOptions {
    purple?: {
      light?: string;
    };
  }
  interface TypeBackground {
    red:string;
    green: string;
    yellow: string;
  }
}

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#2A2431" : "#F8F8F8",
        paper: mode === "dark" ? "#34303ef8" : "#fff",
        red: mode === "dark" ? "#ed4545ff": "#f57d81ff",
        green: mode === "dark" ? "#26c560ff": "#75e9a3ff",
        yellow: mode === "dark" ? "#efd36eff": "#f5ee60ff"},
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
      }, 
      purple: { 
        light: "#B13EEA",},
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      allVariants: {
        wordBreak: "break-word",
        textTransform: "none",
      },
    },
    spacing: 4,
    breakpoints: {
    values: {
      xs: 0,
      sm: 750,  
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  }); 


interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
