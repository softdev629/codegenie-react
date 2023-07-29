import { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf, array } from "zod";
import {
  SubmitHandler,
  useForm,
  FormProvider,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { ReactComponent as SearchIcon } from "../../assets/ico_search.svg";
import { useUpdateProductMutation } from "../../redux/api/productApi";

const saveSchema = object({
  product_name: string().min(1, "Product name is required"),
  product_module: string().min(1, "Product module is required"),
  module_description: string(),
  source_check: array(string()),
  source_text: string().min(1, "Text Source Label can't be empty"),
  source_image: string().min(1, "Image Source Label can't be empty"),
  source_url: string().min(1, "Url Source Label can't be empty"),
  input_box_title: string().min(1, "Input Box Label is required"),
  input_box_description: string(),
  export_check: array(string()),
  export_word: string().min(1, "Word Export Label can't be empty"),
  export_pdf: string().min(1, "PDF Export Label can't be empty"),
  export_text: string().min(1, "Text Export Label can't be empty"),
});

export type ProductSettingSaveInput = TypeOf<typeof saveSchema>;

const ProductConfigurator = () => {
  // const [open, setOpen] = useState(false);
  // const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [checkedSources, setCheckedSources] = useState([
    "source_text",
    "source_image",
    "source_url",
  ]);
  const [checkedExports, setCheckedExports] = useState([
    "export_word",
    "export_pdf",
    "export_text",
  ]);

  const methods = useForm<ProductSettingSaveInput>({
    resolver: zodResolver(saveSchema),
    defaultValues: {
      source_check: ["source_text", "source_image", "source_url"],
      source_text: "Text",
      source_image: "Image",
      source_url: "URL",
      export_check: ["export_word", "export_pdf", "export_text"],
      export_word: "MS Word",
      export_pdf: "PDF",
      export_text: "Text",
    },
  });

  const [updateProduct, updateState] = useUpdateProductMutation();

  const {
    handleSubmit,
    reset,
    register,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (updateState.isSuccess)
      toast.success("Product settings saved successfully");
    if (updateState.isError) {
      console.log(updateState.error);
    }
  }, [
    updateState.isLoading,
    updateState.isSuccess,
    updateState.isError,
    updateState.error,
  ]);

  const onSubmitHandler: SubmitHandler<ProductSettingSaveInput> = (
    values: ProductSettingSaveInput
  ) => {
    console.log(values);
    updateProduct(values);
  };

  function handleSelect(checkedValues: string[], checkedName: string) {
    const newNames = checkedValues.includes(checkedName)
      ? checkedValues?.filter((name) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName];
    checkedName.includes("source")
      ? setCheckedSources(newNames)
      : setCheckedExports(newNames);
  }

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
            {/* <Autocomplete id="search-bar" /> */}
          </Stack>
          <FormProvider {...methods}>
            <Box
              padding={4}
              border="1px solid #CACBCC"
              borderRadius={1}
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
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
                    Configure product here
                  </Typography>
                  <Stack flexDirection="row" gap={3}>
                    <Button
                      variant="outlined"
                      sx={{ width: 152, paddingY: 1 }}
                      onClick={() => reset()}
                    >
                      New
                    </Button>
                    <LoadingButton
                      variant="contained"
                      sx={{ width: 152, paddingY: 1 }}
                      loading={updateState.isLoading}
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
                      {...register("product_name")}
                      required
                      error={!!errors["product_name"]}
                      helperText={errors["product_name"]?.message}
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
                      {...register("product_module")}
                      sx={{ width: 350 }}
                      placeholder="Enter Product module name here."
                      error={!!errors["product_module"]}
                      helperText={errors["product_module"]?.message}
                    />
                    <TextField
                      {...register("module_description")}
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
                      Source Labels
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Stack flexDirection="row" gap={2}>
                      <Box alignItems="center" display="flex" gap={1}>
                        <TextField
                          {...register("source_text")}
                          error={!!errors["source_text"]}
                          helperText={errors["source_text"]?.message}
                          size="small"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_text")}
                              onChange={() =>
                                handleSelect(checkedSources, "source_text")
                              }
                            />
                          )}
                          control={control}
                          name="source_check"
                        />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <TextField
                          {...register("source_image")}
                          error={!!errors["source_image"]}
                          helperText={errors["source_image"]?.message}
                          size="small"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_image")}
                              onChange={() =>
                                handleSelect(checkedSources, "source_image")
                              }
                            />
                          )}
                          control={control}
                          name="source_check"
                        />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <TextField
                          {...register("source_url")}
                          error={!!errors["source_url"]}
                          helperText={errors["source_url"]?.message}
                          size="small"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_url")}
                              onChange={() =>
                                handleSelect(checkedSources, "source_url")
                              }
                            />
                          )}
                          control={control}
                          name="source_check"
                        />
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
                      <TextField
                        {...register("input_box_title")}
                        placeholder="Enter Input Box title here"
                        error={!!errors["input_box_title"]}
                        helperText={errors["input_box_title"]?.message}
                        fullWidth
                      />
                      <TextField
                        {...register("input_box_description")}
                        placeholder="Short description"
                        fullWidth
                      />
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
                        <TextField
                          {...register("export_word")}
                          error={!!errors["export_word"]}
                          helperText={errors["export_word"]?.message}
                          size="small"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedExports.includes("export_word")}
                              onChange={() =>
                                handleSelect(checkedExports, "export_word")
                              }
                            />
                          )}
                          control={control}
                          name="export_check"
                        />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <TextField
                          {...register("export_pdf")}
                          error={!!errors["export_pdf"]}
                          helperText={errors["export_pdf"]?.message}
                          size="small"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedExports.includes("export_pdf")}
                              onChange={() =>
                                handleSelect(checkedExports, "export_pdf")
                              }
                            />
                          )}
                          control={control}
                          name="export_check"
                        />
                      </Box>
                      <Box alignItems="center" display="flex" gap={1}>
                        <TextField
                          {...register("export_text")}
                          size="small"
                          error={!!errors["export_text"]}
                          helperText={errors["export_text"]?.message}
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedExports.includes("export_text")}
                              onChange={() =>
                                handleSelect(checkedExports, "export_text")
                              }
                            />
                          )}
                          control={control}
                          name="export_check"
                        />
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
