import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  Grid,
  Button,
  TextField,
  SvgIcon,
  IconButton,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { ReactComponent as DeleteIcon } from "../../assets/ico_del.svg";
import { ReactComponent as PlustIcon } from "../../assets/ico_plus.svg";

const PriceConfigurator = () => {
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
          Pricing Configurator
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Stack marginTop={5} spacing={2}>
          <Stack alignItems="end">
            {/* <Autocomplete id="search-bar" /> */}
          </Stack>
          <Box
            padding={4}
            border="1px solid #CACBCC"
            borderRadius={1}
            component="form"
            // onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
          >
            <Stack spacing={5}>
              <Stack flexDirection="row">
                <Typography
                  fontWeight="bold"
                  variant="h6"
                  color="text.secondary"
                  flexGrow={1}
                >
                  Configure pricing here
                </Typography>
                <Stack flexDirection="row" gap={3}>
                  <Button
                    variant="outlined"
                    sx={{ width: 152, paddingY: 1 }}
                    // onClick={() => reset()}
                  >
                    New
                  </Button>
                  <LoadingButton
                    variant="contained"
                    sx={{ width: 152, paddingY: 1 }}
                    // loading={updateState.isLoading}
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                </Stack>
              </Stack>
              <Grid container>
                <Grid item xs={2}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    Product Name
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    sx={{ width: 350 }}
                    // {...register("product_name")}
                    required
                    // error={!!errors["product_name"]}
                    // helperText={errors["product_name"]?.message}
                    variant="outlined"
                    placeholder="Enter Product name here."
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    Product Module
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  gap={2}
                  display="flex"
                  flexDirection="column"
                >
                  <TextField
                    // {...register("product_module")}
                    sx={{ width: 350 }}
                    placeholder="Enter Product module name here."
                    // error={!!errors["product_module"]}
                    // helperText={errors["product_module"]?.message}
                  />
                  <TextField
                    // {...register("module_description")}
                    placeholder="Write Product module description here."
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    Plan Details
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  gap={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Typography width={216}>Plan Name</Typography>
                    <Typography width={141}>Total Wishes</Typography>
                    <Typography width={99}>Price</Typography>
                    <Typography width={176}>Period</Typography>
                    <Box width={68}></Box>
                  </Stack>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <TextField sx={{ width: 216 }} placeholder="Plan Name" />
                    <TextField sx={{ width: 141 }} placeholder="Total Wishes" />
                    <TextField sx={{ width: 99 }} placeholder="Price" />
                    <TextField select sx={{ width: 176 }}>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </TextField>
                    <Stack
                      width={68}
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <IconButton sx={{ width: 30, height: 30 }}>
                        <SvgIcon>
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton sx={{ width: 30, height: 30 }}>
                        <SvgIcon>
                          <PlustIcon />
                        </SvgIcon>
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default PriceConfigurator;
