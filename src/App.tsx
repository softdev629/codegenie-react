import { useState, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { getDesignTokens, ColorModeContext } from "./theme";
import ProductConfigurator from "./pages/admin/product.page";
import PriceConfigurator from "./pages/admin/price.page";
import PromptConfigurator from "./pages/admin/prompt.page";
import Dashboard from "./pages/admin/dashboard.page";
import ContentGenerator from "./pages/admin/blogcreate.page";
import GeniePage from "./pages/genie.page";
import LandingPage from "./pages/landing.page";
import SignupPage from "./pages/auth/signup.page";
import TermsPage from "./pages/auth/terms.page";
import SigninPage from "./pages/auth/signin.page";
import ForgotPage from "./pages/auth/forgot.page";
import VerifyPage from "./pages/auth/verify.page";
import RequireUser from "./components/requireUser";
import UnauthorizePage from "./pages/unauthorized.page";
import PricingPage from "./pages/pricing.page";

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
          <ToastContainer />
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<RequireUser allowedRoles={["admin", "user"]} />}>
              <Route path="/" element={<Layout type="user" />}>
                <Route path="codegenie/:module" element={<GeniePage />} />
                <Route path="pricing" element={<PricingPage />} />
              </Route>
            </Route>
            <Route element={<RequireUser allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<Layout type="admin" />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="config">
                  <Route path="products" element={<ProductConfigurator />} />
                  <Route path="prompts" element={<PromptConfigurator />} />
                  <Route path="prices" element={<PriceConfigurator />} />
                </Route>
                <Route path="content">
                  <Route path="generate" element={<ContentGenerator />} />
                </Route>
              </Route>
            </Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/unauthorized" element={<UnauthorizePage />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
