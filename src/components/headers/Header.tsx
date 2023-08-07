import { useState, useContext, useEffect } from "react";
import {
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
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../logo.svg";
import { ReactComponent as CrownIcon } from "../../assets/ico_crown.svg";
import { ReactComponent as ProductIcon } from "../../assets/ico_product.svg";
import { ReactComponent as DownIcon } from "../../assets/ico_downarr.svg";

import { ColorModeContext } from "../../theme";
import { useLazyGetModulesQuery } from "../../redux/api/productApi";
import { useAppDispatch } from "../../redux/store";
import { setModule } from "../../redux/features/genieSlice";

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

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const colorMode = useContext(ColorModeContext);

  const [modules, setModules] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [getModules, getState] = useLazyGetModulesQuery();

  useEffect(() => {
    getModules("CodeGenie");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getState.isSuccess)
      setModules(getState.data.filter((item) => item !== ""));
  }, [getState]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
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
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
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
            ></Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 12,
              gap: 6,
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              startIcon={
                <SvgIcon>
                  <ProductIcon />
                </SvgIcon>
              }
              endIcon={
                <SvgIcon>
                  <DownIcon />
                </SvgIcon>
              }
              sx={{ color: "inherit" }}
            >
              Products
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {modules.map((module, index) => (
                <MenuItem
                  key={`menu_item_${index}`}
                  onClick={() => {
                    handleClose();
                    navigate(
                      `codegenie/${module.toLowerCase().replace(" ", "_")}`
                    );
                    localStorage.setItem("module", module);
                    dispatch(setModule(module));
                  }}
                >
                  {module}
                </MenuItem>
              ))}
            </Menu>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Button>Invite Team Members</Button>
            </Box>
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
    </>
  );
}
export default Header;
