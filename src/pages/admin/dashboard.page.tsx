import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  MenuItem,
  SvgIcon,
  InputAdornment,
} from "@mui/material";

import { ReactComponent as CalendarIcon } from "../../assets/ico_calendar.svg";

const Dashboard = () => {
  return (
    <>
      <Container sx={{ paddingTop: 5 }}>
        <Stack gap={9}>
          <Stack gap={3}>
            <Typography variant="h5">Your Overview</Typography>
            <Stack flexDirection="row" gap={10}>
              <Box>
                <TextField select defaultValue="last_seven" size="small">
                  <MenuItem value="last_seven">Last 7 days</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon>
                          <CalendarIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  defaultValue="15 Mar. - 30 Mar."
                />
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <Typography>Compared to</Typography>
                <TextField select defaultValue="previous_period" size="small">
                  <MenuItem value="previous_period">Previous period</MenuItem>
                </TextField>
                <TextField select defaultValue="daily" size="small">
                  <MenuItem value="daily">Daily</MenuItem>
                </TextField>
                <TextField select defaultValue="product" size="small">
                  <MenuItem value="product">Product</MenuItem>
                </TextField>
              </Box>
            </Stack>
            <Stack flexDirection="row" gap={2}>
              <Box sx={{ flex: 1 }}>
                <Box padding={2}>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Typography display="flex" alignItems="center">
                      TOTAl USERS
                    </Typography>
                    <Box
                      borderRadius={6}
                      bgcolor="#C8EEC7"
                      padding="8px 12px 8px 12px"
                    >
                      +20% Increase
                    </Box>
                  </Stack>
                  <Typography color="#4BA5EB" variant="h4" fontWeight="bold">
                    200
                  </Typography>
                </Box>
                <Box
                  bgcolor="#F2F6FA"
                  display="flex"
                  py={1}
                  justifyContent="center"
                >
                  More Info &gt;
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box padding={2}>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Typography display="flex" alignItems="center">
                      TOTAL REVENUE
                    </Typography>
                    <Box
                      borderRadius={6}
                      bgcolor="#C8EEC7"
                      padding="8px 12px 8px 12px"
                    >
                      +20% Increase
                    </Box>
                  </Stack>
                  <Typography color="#4BA5EB" variant="h4" fontWeight="bold">
                    $12,989
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  py={1}
                  justifyContent="center"
                  bgcolor="#F2F6FA"
                >
                  More Info &gt;
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box padding={2}>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Typography display="flex" alignItems="center">
                      TOTAL WISHES
                    </Typography>
                    <Box
                      borderRadius={6}
                      bgcolor="#C8EEC7"
                      padding="8px 12px 8px 12px"
                    >
                      +20 New Wisher
                    </Box>
                  </Stack>
                  <Typography color="#4BA5EB" variant="h4" fontWeight="bold">
                    78
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  py={1}
                  justifyContent="center"
                  bgcolor="#F2F6FA"
                >
                  More Info &gt;
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Dashboard;
