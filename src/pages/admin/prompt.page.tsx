import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  Button,
  TextField,
  SvgIcon,
  MenuItem,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";

import { ReactComponent as PlustWhiteIcon } from "../../assets/ico_plus_white.svg";

const PromptConfigurator = () => {
  return (
    <>
      <Box paddingY={5}>
        <Typography
          textAlign="center"
          variant="h4"
          sx={{
            background:
              "-webkit-linear-gradient(139deg, #036AB7 0%, #49A4EA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.8px",
            fontWeight: "bold",
          }}
        >
          Prompt Configurator
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Stack marginTop={5} spacing={2}>
          <Stack alignItems="end">
            <Button
              variant="contained"
              sx={{ textTransform: "none", paddingY: 1, paddingX: 2 }}
              startIcon={
                <SvgIcon>
                  <PlustWhiteIcon />
                </SvgIcon>
              }
            >
              Add prompt configuration settings
            </Button>
          </Stack>
          <Box
            padding={4}
            border="1px solid #CACBCC"
            borderRadius={1}
            component="form"
            // onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography width={181}>Products</Typography>
              <Typography width={216}>Plans</Typography>
              <Typography width={216}>Module</Typography>
              <Typography width={216}>Prompt name</Typography>
              <Typography width={184}>Feature list order</Typography>
            </Stack>
            <Stack flexDirection="row" justifyContent="space-between">
              <TextField sx={{ width: 181 }} size="small" select>
                <MenuItem value="placeholder">Select product</MenuItem>
              </TextField>
              <TextField sx={{ width: 216 }} size="small" select>
                <MenuItem value="free">Free</MenuItem>
              </TextField>
              <TextField sx={{ width: 216 }} size="small" select>
                <MenuItem value="all">All Code</MenuItem>
              </TextField>
              <TextField sx={{ width: 216 }} size="small" select>
                <MenuItem value="debug">Debug</MenuItem>
              </TextField>
              <TextField sx={{ width: 184 }} size="small" select>
                <MenuItem value="feature">Feature list order</MenuItem>
              </TextField>
            </Stack>
            <Stack flexDirection="row" justifyContent="flex-end">
              <Typography width={184}>Note: 3rd listed in UI</Typography>
            </Stack>
            <Typography>Prompt</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue="Analyze the code if the code is a smart contract then simply say “the code is smart contract. Please use the smart contract module to analyze this code”. If the code is not smart contract then DEBUG the code."
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default PromptConfigurator;
