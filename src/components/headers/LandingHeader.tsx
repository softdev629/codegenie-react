import { useState, useEffect } from "react";
import {
  Container,
  Toolbar,
  SvgIcon,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { ReactComponent as Logo } from "../../logo.svg";
import { ReactComponent as ProductIcon } from "../../assets/ico_product.svg";
import { ReactComponent as DownIcon } from "../../assets/ico_downarr.svg";

import { useLazyGetModulesQuery } from "../../redux/api/productApi";
import { setModule } from "../../redux/features/genieSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const LandingHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modules, setModules] = useState<string[]>([]);

  const [getModules, getState] = useLazyGetModulesQuery();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getModules("CodeGenie");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getState.isSuccess) {
      setModules(getState.data.filter((item) => item !== ""));
      dispatch(setModule(getState.data[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                    localStorage.setItem("module", module);
                    dispatch(setModule(module));
                  }}
                >
                  {module}
                </MenuItem>
              ))}
            </Menu>
            <Box flexGrow={1}></Box>
            <Box display="flex" gap={5}>
              <Button
                sx={{
                  background:
                    "linear-gradient(270deg, #4BA5EB 0%, #0168B5 100%)",
                  color: "white",
                  borderRadius: "4px",
                  padding: "12px 16px",
                  height: "44px",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Try Now
              </Button>

              <Button
                sx={{
                  border: "1px solid #4BA5EB",
                  padding: "12px 16px",
                  height: "44px",
                }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </>
  );
};

export default LandingHeader;
