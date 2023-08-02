import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  SvgIcon,
  IconButton,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

import { ReactComponent as CopyIcon } from "../../assets/ico_copy.svg";
import { ReactComponent as ExportIcon } from "../../assets/ico_export.svg";

import { useGetPromptNamesQuery } from "../../redux/api/promptApi";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPromptName } from "../../redux/features/genieSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, ...other } = props;

  return (
    <div role="tabpanel" style={{ flex: 1 }} {...other}>
      <Box
        sx={(theme) => ({
          p: 3,
          backgroundColor: theme.palette.background.paper,
          height: "100%",
        })}
      >
        {children}
      </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TotalPanel() {
  const [value, setValue] = useState(0);
  const genieSelector = useAppSelector((state) => state.genieState);
  const dispatch = useAppDispatch();

  const promptsInfo = useGetPromptNamesQuery({
    product_name: "CodeGenie",
    product_module: genieSelector.module ? genieSelector.module : "",
  });

  useEffect(() => {
    if (promptsInfo.isSuccess) {
      dispatch(setPromptName(promptsInfo.data[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptsInfo]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (promptsInfo.data) dispatch(setPromptName(promptsInfo.data[newValue]));
  };

  if (!promptsInfo.data) return null;

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        display: "flex",
        height: "100%",

        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: 1,
      })}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={(theme) => ({
          borderRight: 1,
          borderColor: "divider",
          overflow: "visible",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "white",
          ".MuiTabs-indicator": {
            visibility: "hidden",
          },
          ".MuiTabs-scroller": {
            overflow: "visible !important",
          },
        })}
      >
        {promptsInfo.data.map((panel, index) => (
          <Tab
            key={`result_panel_${index}`}
            sx={(theme) => ({
              textTransform: "none",
              alignItems: "flex-start",
              color: theme.palette.mode === "dark" ? "#F8FAFC" : "#475569",
              overflow: "visible",
              padding: "24px 14px",
              borderBottom: "1px solid",
              borderColor: "divider",
              "&.Mui-selected": {
                borderLeft: "3px solid",
                backgroundColor: theme.palette.background.paper,
              },
              "&.Mui-selected::after": {
                overflow: "visible",
                content: '" "',
                left: "98%",
                position: "absolute",
                width: 10,
                height: "100%",
                zIndex: 101,
                backgroundColor: theme.palette.background.paper,
              },
            })}
            label={panel}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      <TabPanel value={value}>
        <Stack gap="16px" height="100%">
          <Stack flexDirection="row">
            <Typography
              variant="h5"
              color="text.secondary"
              fontWeight="500"
              flexGrow={1}
            >
              Results
            </Typography>
            <Stack gap="16px" flexDirection="row">
              <IconButton>
                <SvgIcon>
                  <CopyIcon />
                </SvgIcon>
              </IconButton>
              <Button
                startIcon={
                  <SvgIcon>
                    <ExportIcon />
                  </SvgIcon>
                }
                variant="outlined"
                color="inherit"
                sx={(theme) => ({
                  borderColor: theme.palette.divider,
                })}
              >
                Export
              </Button>
            </Stack>
          </Stack>
          <Divider />
          <Box
            component="pre"
            sx={(theme) => ({
              whiteSpace: "pre-wrap",
              overflow: "auto",
              height: "calc(100vh - 400px)",
              "&.MuiBox-root::-webkit-scrollbar": {
                width: 4,
              },
              "&.MuiBox-root::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.divider,
                borderRadius: 4,
              },
              "&.MuiBox-root::-webkit-scrollbar-track": {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#2D2D2D" : "#fff",
              },
            })}
          >
            {genieSelector.msg}
          </Box>
        </Stack>
      </TabPanel>
    </Box>
  );
}
