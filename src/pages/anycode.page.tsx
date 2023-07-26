import { useState } from "react";
import {
  Container,
  Link,
  Typography,
  Breadcrumbs,
  Divider,
  Grid,
  Stack,
  Button,
  SvgIcon,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { ReactComponent as TextIcon } from "../assets/ico_text.svg";
import { ReactComponent as ImageIcon } from "../assets/ico_image.svg";
import { ReactComponent as UrlIcon } from "../assets/ico_url.svg";
import { ReactComponent as WishIcon } from "../assets/ico_wish.svg";
import TotalPanel from "../components/anycode/TotalPanel";
import TextCode from "../components/anycode/TextCode";

const loadTypes = [
  {
    text: "Text",
    icon: (
      <Box
        sx={{
          bgcolor: "#E06F41",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "0px !important",
        }}
      >
        <SvgIcon>
          <TextIcon />
        </SvgIcon>
      </Box>
    ),
  },
  {
    text: "Image",
    icon: (
      <Box
        sx={{
          bgcolor: "#7AB65D",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "0px !important",
        }}
      >
        <SvgIcon sx={{ bgcolor: "#7AB65D" }}>
          <ImageIcon />
        </SvgIcon>
      </Box>
    ),
  },
  {
    text: "Url",
    icon: (
      <Box
        sx={{
          bgcolor: "#0168B5",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "0px !important",
        }}
      >
        <SvgIcon sx={{ bgcolor: "#0168B5" }}>
          <UrlIcon width={24} height={24} />
        </SvgIcon>
      </Box>
    ),
  },
];

const CodeBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#737373" : "#E3E3E3",
  borderRadius: 4,
  height: "500px",
  overflow: "auto",
  "::-webkit-scrollbar": {
    width: 4,
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.divider,
    borderRadius: 4,
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#fff",
  },
}));

const AnyCodePage = () => {
  const [value, setValue] = useState(0);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Any Code
    </Typography>,
  ];

  return (
    <Container maxWidth="xl" sx={{ height: "calc(100vh - 100px)" }}>
      <Stack height="100%">
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ marginY: 3 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider />
        <Grid container flexGrow={1}>
          <Grid item xs={5} paddingTop={5} paddingRight={2}>
            <Stack spacing={3} height="100%">
              <Tabs
                onChange={(e: React.SyntheticEvent, newValue: number) =>
                  setValue(newValue)
                }
                value={value}
                sx={{
                  "& .MuiTabs-scroller .MuiTabs-flexContainer": { gap: 2 },
                }}
              >
                {loadTypes.map((type, index) => (
                  <Tab
                    key={`loadtype_${index}`}
                    // variant="outlined"
                    sx={{
                      flex: 1,
                      justifyContent: "left",
                      padding: "8px 16px",
                      border: "1px solid",
                      borderColor: "inherit",
                      borderRadius: 1,
                    }}
                    iconPosition="start"
                    icon={type.icon}
                    label={type.text}
                  />
                ))}
              </Tabs>
              <Typography variant="h4" color="text.secondary">
                Current Code
              </Typography>

              <CodeBox>
                <TextCode />
              </CodeBox>
              <Stack alignItems="end">
                <Button
                  startIcon={
                    <SvgIcon>
                      <WishIcon />
                    </SvgIcon>
                  }
                  sx={{
                    background:
                      "linear-gradient(270deg, #4BA5EB 0%, #0168B5 100%)",
                    marginLeft: 5,
                    color: "white",
                    paddingX: "20px",
                    paddingY: "12px",
                    borderRadius: "4px",
                    width: "fit-content",
                  }}
                >
                  Execute Wish
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Divider orientation="vertical" />
          <Grid item xs={6.9} pl="24px" pt="40px">
            <TotalPanel />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default AnyCodePage;
