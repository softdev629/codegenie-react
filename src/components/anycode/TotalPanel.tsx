import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AnalyzePanel from "./AnalyzePanel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ flex: 1 }}
      {...other}
    >
      {value === index && (
        <Box
          sx={(theme) => ({
            p: 3,
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            height: "100%",
          })}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const panels = [
  {
    text: "Anaylze",
    element: <AnalyzePanel />,
  },
  {
    text: "Explain",
  },
  {
    text: "Debug",
  },
  {
    text: "Test Cases",
  },
  {
    text: "Feature Suggestions",
  },
  {
    text: "Refactor",
  },
  {
    text: "Rewrite",
  },
  {
    text: "Microservices",
  },
];

export default function TotalPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        aria-label="Vertical tabs example"
        // indicatorColor="secondary"
        sx={(theme) => ({
          borderRight: 1,
          borderColor: "divider",
          overflow: "visible",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.main
              : "white",
          ".MuiTabs-indicator": {
            visibility: "hidden",
          },
          ".MuiTabs-scroller": {
            overflow: "visible !important",
          },
        })}
      >
        {panels.map((panel, index) => (
          <Tab
            sx={(theme) => ({
              textTransform: "none",
              alignItems: "flex-start",
              color: theme.palette.mode === "dark" ? "#F8FAFC" : "#475569",
              overflow: "visible",
              padding: "24px 14px",
              borderBottom: "1px solid",
              borderColor: "divider",
              "&.Mui-selected": {
                color: "#4BA5EB",
                borderLeft: "3px solid",
                borderColor: "#4BA5EB",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              },
              "&.Mui-selected::after": {
                overflow: "visible",
                content: '" "',
                left: "98%",
                position: "absolute",
                width: 10,
                height: "100%",
                zIndex: 101,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              },
            })}
            label={panel.text}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {panels.map((panel, index) => (
        <TabPanel value={value} index={index}>
          {panel.element}
        </TabPanel>
      ))}
    </Box>
  );
}
