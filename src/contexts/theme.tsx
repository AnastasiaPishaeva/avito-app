import { createTheme } from "@mui/material/styles";


declare module "@mui/material/styles" {
  interface Palette {
    purple: {
      light: string;
      main: string;
      dark: string;
      onHover: string;
      toClick: string;
    };
  }
  interface PaletteOptions {
    purple?: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
      onHover?: string;
      toClick?: string;
    };
  }
  interface TypeBackground {
    card: string;
    cardContent: string;
    textCard: string;
  }
  interface Theme {
    shape: {
      borderRadius: string;
      cardRadius: string; 
    };
  }
  interface ThemeOptions {
    shape?: {
      borderRadius?: string;
      cardRadius?: string;
    };
  }
  interface TypeText {
    white: string;
    black: string;
  }
}

const theme = createTheme({
    palette: {
      mode: "light",
      background: {
        default : "#F8F8F8",
        paper:  "#fff",
        card: "#eaddff",
        cardContent:  "#EEEAF6",
        textCard:  "#EEEEEE",
      },
      text: {
        primary:  "#000",
        secondary:  "#fff",
        white: "#fff",
        black: "#000"
      },
      error: { main: "#EA5D5D"}, 
      grey: { 
        500: "#b0afaf",
       }, 
      purple: { 
        light: "#B13EEA",
        main: "#9b59b6",
        dark : "#B294C1",
        onHover:  "88, 77, 104",
        toClick: "#6B5195"},
    },
    typography: {
      fontFamily: "'Montserrat', cursive",
      h1: {
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: "70px",
        lineHeight: "1.2",
        fontWeight: "bold",
        letterSpacing: "1px"
      },
      allVariants: {
        wordBreak: "break-word",
        textTransform: "none",
      },
    },
    spacing: 4,
    shape: {
      borderRadius: "8px", 
      cardRadius: "20px",
    },
  }); 

export default theme;
