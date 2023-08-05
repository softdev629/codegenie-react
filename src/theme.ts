import { createContext } from "react";
import { PaletteMode } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#4BA5EB",
            contrastText: "#fff",
          },
          text: {
            primary: "#475569",
            secondary: "#1D252D",
          },
          background: {
            default: "#F9FBFC",
            paper: "#F8FBFF",
          },
          divider: "#E3E3E3",
        }
      : {
          primary: {
            main: "#4BA5EB",
          },
          background: {
            default: "#131825",
            paper: "#1C212E",
          },
          text: {
            primary: "#CBCBCB",
            secondary: "#FFFFFF",
          },
          divider: "#737373",
        }),
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontSize: 16,
    },
    button: {
      textTransform: "none",
    },
  } as TypographyOptions,
});
