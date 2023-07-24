import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  SvgIcon,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { ReactComponent as Logo } from "../logo.svg";
import { ReactComponent as AnyCodeIcon } from "../assets/ico_anycode.svg";
import { ReactComponent as SmartContractIcon } from "../assets/ico_smartcon.svg";
import { ReactComponent as APIDocumnetationIcon } from "../assets/ico_apidoc.svg";
import { ReactComponent as CrownIcon } from "../assets/ico_crown.svg";

import { ColorModeContext } from "../theme";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  marginLeft: 10,
  border: "1px solid #1D252D",
  borderRadius: 8,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 10,
    height: 10,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
    background: theme.palette.mode === "dark" ? "white" : "#1D252D",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "linear-gradient(#0168B5, #4BA5EB)"
        : "rgba(255,255,255,1)",
    boxSizing: "border-box",
  },
}));

const pages = [
  {
    icon: <AnyCodeIcon />,
    text: "Any Code",
  },
  {
    icon: <SmartContractIcon />,
    text: "Smart Contracts",
  },
  {
    icon: <APIDocumnetationIcon />,
    text: "API Documentation",
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const colorMode = React.useContext(ColorModeContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundImage: "none", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon
            sx={{
              mr: 1,
              width: 44,
              height: 44,
            }}
          >
            <Logo />
          </SvgIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CodeGenie
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CodeGenie
          </Typography>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <SvgIcon sx={{ mr: 1 }}>{page.icon}</SvgIcon>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 12,
              gap: 6,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit" }}
                startIcon={<SvgIcon>{page.icon}</SvgIcon>}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "block" } }}>
            <FormControlLabel
              value="start"
              control={<AntSwitch onChange={colorMode.toggleColorMode} />}
              label="Darkmode"
              labelPlacement="start"
            />
            <Button
              startIcon={
                <SvgIcon>
                  <CrownIcon />
                </SvgIcon>
              }
              sx={{
                background: "linear-gradient(270deg, #4BA5EB 0%, #0168B5 100%)",
                marginLeft: 5,
                color: "white",
                paddingX: 2,
                paddingY: 1,
              }}
            >
              Upgrade
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
}
export default Header;