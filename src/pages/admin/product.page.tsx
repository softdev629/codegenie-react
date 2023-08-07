import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  TextField,
  Button,
  Grid,
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

import {
  useLazyGetProductQuery,
  useLazySearchProductQuery,
  useUpdateProductMutation,
  useAddProductMutation,
} from "../../redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { IProductHeadings } from "../../redux/api/types";

const saveSchema = object({
  product_name: string().min(1, "Product name is required").optional(),
  product_module: string().optional(),
  module_description: string().optional(),
  source_check: array(string()).optional(),
  source_text: string().optional(),
  source_image: string().optional(),
  source_url: string().optional(),
  input_box_title: string().optional(),
  input_box_description: string().optional(),
  export_check: array(string()).optional(),
  export_word: string().optional(),
  export_pdf: string().optional(),
  export_text: string().optional(),
  id: string().optional(),
});

export type ProductSettingSaveInput = TypeOf<typeof saveSchema>;

const ProductConfigurator = () => {
  const [options, setOptions] = useState<IProductHeadings[]>([]);
  const [checkedSources, setCheckedSources] = useState<string[]>([]);
  const [checkedExports, setCheckedExports] = useState<string[]>([]);
  const [filter, setFilter] = useState<IProductHeadings | null>(null);

  const navigate = useNavigate();

  const methods = useForm<ProductSettingSaveInput>({
    resolver: zodResolver(saveSchema),
    defaultValues: {},
  });

  const [updateProduct, updateState] = useUpdateProductMutation();
  const [searchProduct, searchState] = useLazySearchProductQuery();
  const [getProduct, getState] = useLazyGetProductQuery();
  const [addProduct, addState] = useAddProductMutation();

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    searchProduct("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateState.isSuccess) {
      toast.success("Product saved successfully");
      searchProduct("");
    }
    if (updateState.isError) {
      console.log(updateState.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateState]);

  useEffect(() => {
    if (addState.isSuccess) {
      toast.success("Product added successfully");
      searchProduct("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addState]);

  useEffect(() => {
    setFilter(null);
    if (searchState.isSuccess) setOptions(searchState.data);
  }, [searchState]);

  useEffect(() => {
    const { data } = getState;
    if (data) {
      setValue("product_name", data.product_name);
      setValue("product_module", data.product_module);
      setValue("module_description", data.module_description);
      setValue("source_text", data.source_text);
      setValue("source_image", data.source_image);
      setValue("source_url", data.source_url);
      setValue("input_box_title", data.input_box_title);
      setValue("input_box_description", data.input_box_description);
      setValue("export_word", data.export_word);
      setValue("export_pdf", data.export_pdf);
      setValue("export_text", data.export_text);
      setCheckedSources(data.source_check ? data.source_check : []);
      setCheckedExports(data.export_check ? data.export_check : []);
    }
  }, [getState, setValue]);

  const onSubmitHandler: SubmitHandler<ProductSettingSaveInput> = (
    values: ProductSettingSaveInput
  ) => {
    let id = getValues("id");
    if (id === "") addProduct(values);
    else updateProduct(values);
  };

  function handleSelect(checkedValues: string[], checkedName: string) {
    const newNames = checkedValues.includes(checkedName)
      ? checkedValues?.filter((name) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName];
    checkedName.includes("source")
      ? setValue("source_check", newNames)
      : setValue("export_check", newNames);
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
            <Autocomplete
              options={options}
              noOptionsText="No Products"
              sx={{ width: 216 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Products"
                  fullWidth
                  size="small"
                />
              )}
              getOptionLabel={(option) =>
                `${option.product_name} : ${option.product_module}`
              }
              renderOption={(props, option) => {
                return (
                  <li {...props}>
                    {option.product_name} : {option.product_module}
                  </li>
                );
              }}
              value={filter}
              onChange={(event, newValue) => {
                if (newValue) {
                  setFilter(newValue);
                  getProduct(newValue);
                  setValue("id", newValue._id);
                }
              }}
            />
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
                      onClick={() => {
                        reset();
                        setValue("id", "");
                        setFilter(null);
                      }}
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
                          placeholder="Text"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_text")}
                              onChange={() => {
                                handleSelect(checkedSources, "source_text");
                              }}
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
                          placeholder="Image"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_image")}
                              onChange={() => {
                                handleSelect(checkedSources, "source_image");
                              }}
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
                          placeholder="URL"
                        />
                        <Controller
                          render={() => (
                            <Checkbox
                              checked={checkedSources.includes("source_url")}
                              onChange={() => {
                                handleSelect(checkedSources, "source_url");
                              }}
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
                          placeholder="MS Word"
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
                          placeholder="PDF"
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
                          placeholder="Text"
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
                <TextField
                  {...register("id")}
                  type="hidden"
                  sx={{ display: "none" }}
                />
              </Stack>
            </Box>
          </FormProvider>
          <Stack alignItems="end" gap={2}>
            <Button
              variant="contained"
              sx={{ paddingY: 1 }}
              onClick={() => navigate("/admin/config/prompts")}
            >
              Add Features & Prompts
            </Button>
            <Button
              variant="contained"
              sx={{ paddingY: 1 }}
              onClick={() => navigate("/admin/config/prices")}
            >
              Add Pricing
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProductConfigurator;
