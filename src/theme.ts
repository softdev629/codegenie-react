import { createContext } from "react";
import { PaletteMode } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#F9FBFC",
            dark: "#F8FBFF",
          },
          text: {
            primary: "#475569",
            secondary: "#000000",
          },
          background: {
            default: "#F9FBFC",
          },
          divider: "#E3E3E3",
        }
      : {
          primary: {
            main: "#131825",
            light: "#1C212E",
          },
          background: {
            default: "#131825",
            paper: "#131825",
          },
          text: {
            primary: "#CBCBCB",
            secondary: "#FFFFFF",
          },
          divider: "#737373",
        }),
  },
});
