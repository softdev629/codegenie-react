import { useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  TextField,
  SvgIcon,
  InputAdornment,
  Button,
  Grid,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { ReactComponent as SearchIcon } from "../../assets/ico_search.svg";
import { useConfigProductMutation } from "../../redux/api/configApi";
import FormInput from "../../components/FormInput";

const saveSchema = object({
  name: string().min(1, "Product name is required"),
  module: string().min(1, "Product module is required"),
  source_text: string().min(1, "Text Source Label can't be empty"),
  source_image: string().min(1, "Image Source Label can't be empty"),
  source_url: string().min(1, "Url Source Label can't be empty"),
  input_box: string().min(1, "Input Box Label is required"),
  export_word: string().min(1, "Word Export Label can't be empty"),
  export_pdf: string().min(1, "PDF Export Label can't be empty"),
  export_text: string().min(1, "Text Export Label can't be empty"),
});

export type ProductSettingSaveInput = TypeOf<typeof saveSchema>;

const ProductConfigurator = () => {
  const methods = useForm<ProductSettingSaveInput>({
    resolver: zodResolver(saveSchema),
  });

  const [configProduct, configState] = useConfigProductMutation();

  const { handleSubmit } = methods;

  useEffect(() => {
    if (configState.isSuccess)
      toast.success("Product settings saved successfully");
    if (configState.isError) {
      console.log(configState.error);
    }
  }, [
    configState.isLoading,
    configState.isSuccess,
    configState.isError,
    configState.error,
  ]);

  const onSubmitHandler: SubmitHandler<ProductSettingSaveInput> = (values) => {
    console.log("asf");
    configProduct(values);
  };

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
          Product Configurator
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Stack marginTop={5} spacing={2}>
          <Stack alignItems="end">
            <TextField
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
            />
          </Stack>
          <FormProvider {...methods}>
            <Box
              padding={4}
              border="1px solid #CACBCC"
              borderRadius={1}
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              // noValidate
            >
              <Stack spacing={5}>
                <Stack flexDirection="row">
                  <Typography
                    fontWeight="bold"
                    variant="h6"
                    color="text.secondary"
                    flexGrow={1}
                  >
                    Configure product here
                  </Typography>
                  <Stack flexDirection="row" gap={3}>
                    <Button variant="outlined" sx={{ width: 152, paddingY: 1 }}>
                      New
                    </Button>
                    <LoadingButton
                      variant="contained"
                      sx={{ width: 152, paddingY: 1 }}
                      loading={configState.isLoading}
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
                    <FormInput
                      sx={{ width: 350 }}
                      name="name"
                      variant="outlined"
                      defaultValue="CodeGenie"
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
                    <TextField defaultValue="Any Code" sx={{ width: 350 }} />
                    <TextField placeholder="Write Product module description here. " />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography
                      color="text.secondary"
                      variant="h6"
                      fontWeight={400}
                    >
                      Source Labels
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Stack flexDirection="row" gap={2}>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="source_text"
                          defaultValue="Text"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="source_image"
                          defaultValue="Image"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="source_url"
                          defaultValue="URL"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography
                      color="text.secondary"
                      variant="h6"
                      fontWeight={400}
                    >
                      Input Box
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Stack flexDirection="row" gap={1}>
                      <FormInput name="input_box" defaultValue="Current Code" />
                      <TextField placeholder="Short description" fullWidth />
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography
                      color="text.secondary"
                      variant="h6"
                      fontWeight={400}
                    >
                      Export Options
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Stack flexDirection="row" gap={2}>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="export_word"
                          defaultValue="MS Word"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="export_pdf"
                          defaultValue="PDF"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <FormInput
                          name="export_text"
                          defaultValue="Text"
                          size="small"
                        />
                        <Checkbox sx={{ padding: 0 }} />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </FormProvider>
        </Stack>
      </Container>
    </>
  );
};

export default ProductConfigurator;
