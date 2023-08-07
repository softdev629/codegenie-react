import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  SvgIcon,
  Typography,
  Stack,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

import { ReactComponent as Logo } from "../../logo.svg";

const pages = [
  {
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    text: "Content Generator",
    link: "/content/generate",
  },
  {
    text: "Content Editor",
    link: "/content/edit",
  },
  {
    text: "Price Configurator",
    link: "/config/prices",
  },

  {
    text: "API Configurator",
    link: "/config/api",
  },
  {
    text: "Prompt Configurator",
    link: "/config/prompts",
  },
  {
    text: "Product Configurator",
    link: "/config/products",
  },
];

const AdminHeader = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ padding: "16px 32px" }}>
        <Stack flexDirection="row" gap={8}>
          <Stack gap="8px" flexDirection="row">
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
                alignItems: "center",
              }}
            >
              CodeGenie
            </Typography>
          </Stack>
          <Tabs
            onChange={(e: React.SyntheticEvent, newValue: number) =>
              setValue(newValue)
            }
            value={value}
          >
            {pages.map((page, index) => (
              <Tab
                key={`admin_tab_${index}`}
                label={page.text}
                id={`admin-tab-${index}`}
                sx={{
                  textTransform: "none",
                  "&.Mui-selected": { color: "#4BA5EB" },
                }}
                onClick={() => navigate(`/admin${page.link}`)}
              />
            ))}
          </Tabs>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};

export default AdminHeader;
