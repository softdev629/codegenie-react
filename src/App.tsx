import { useState, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "./components/Layout";
import { getDesignTokens, ColorModeContext } from "./theme";
import AnyCodePage from "./pages/anycode.page";
import ProductConfigurator from "./pages/admin/product.page";
import PriceConfigurator from "./pages/admin/price.page";
import PromptConfigurator from "./pages/admin/prompt.page";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout type="user" />}>
              <Route path="anycode" element={<AnyCodePage />} />
            </Route>
            <Route path="/admin" element={<Layout type="admin" />}>
              <Route path="configure">
                <Route path="product" element={<ProductConfigurator />} />
                <Route path="prompt" element={<PromptConfigurator />} />
                <Route path="price" element={<PriceConfigurator />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
