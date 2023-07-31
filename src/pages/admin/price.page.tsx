import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  Grid,
  TextField,
  SvgIcon,
  IconButton,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf, array, number } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { ReactComponent as DeleteIcon } from "../../assets/ico_del.svg";
import { ReactComponent as PlustIcon } from "../../assets/ico_plus.svg";
import { IPlanDetail, IProductHeadings } from "../../redux/api/types";
import {
  useLazyGetProductQuery,
  useLazySearchProductQuery,
  useUpdatePriceMutation,
} from "../../redux/api/productApi";

const saveSchema = object({
  product_name: string().min(1, "Product name is required"),
  product_module: string().optional(),
  module_description: string().optional(),
  plan_details: array(
    object({
      plan_name: string(),
      total_wishes: number().optional(),
      price: string(),
      period: string(),
    })
  ),
});

export type PriceSettingSaveInput = TypeOf<typeof saveSchema>;

const PriceConfigurator = () => {
  const [options, setOptions] = useState<IProductHeadings[]>([]);
  const [filter, setFilter] = useState<IProductHeadings | null>(null);
  const [plans, setPlans] = useState<IPlanDetail[]>([
    {
      plan_name: "",
      total_wishes: 0,
      price: "",
      period: "",
    },
  ]);

  const methods = useForm<PriceSettingSaveInput>({
    resolver: zodResolver(saveSchema),
    defaultValues: {},
  });

  const [searchProduct, searchState] = useLazySearchProductQuery();
  const [getProduct, getState] = useLazyGetProductQuery();
  const [updatePrice, updateState] = useUpdatePriceMutation();

  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    searchProduct("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchState.data) setOptions(searchState.data);
  }, [searchState]);

  useEffect(() => {
    if (updateState.isSuccess)
      toast.success("Price plan updated successfully!");
  }, [updateState]);

  useEffect(() => {
    const { data } = getState;
    setValue("product_name", data?.product_name as string);
    setValue("product_module", data?.product_module as string);
    setValue("module_description", data?.module_description as string);
    if (data?.plan_details) setPlans([...data.plan_details]);
    else
      setPlans([
        {
          plan_name: "",
          total_wishes: 0,
          price: "",
          period: "",
        },
      ]);
  }, [getState, setValue]);

  const onSubmitHandler: SubmitHandler<PriceSettingSaveInput> = (
    values: PriceSettingSaveInput
  ) => {
    console.log(values);
    updatePrice(values);
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
          Pricing Configurator
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
                }
              }}
            />
          </Stack>
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
                  Configure pricing here
                </Typography>
                <Stack flexDirection="row">
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
              <FormProvider {...methods}>
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
                      disabled
                      required
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
                      disabled
                    />
                    <TextField
                      {...register("module_description")}
                      disabled
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
                    {plans.map((plan, index) => (
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        key={`plan_item_${index}`}
                      >
                        <TextField
                          {...register(`plan_details.${index}.plan_name`)}
                          sx={{ width: 216 }}
                          placeholder="Plan Name"
                          value={plan.plan_name}
                          onChange={(e) => {
                            plans[index].plan_name = e.target.value;
                            setPlans([...plans]);
                          }}
                        />
                        <TextField
                          {...register(`plan_details.${index}.total_wishes`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          sx={{ width: 141 }}
                          placeholder="Total Wishes"
                          value={plan.total_wishes}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            plans[index].total_wishes = e.target.valueAsNumber;
                            setPlans([...plans]);
                          }}
                        />
                        <TextField
                          {...register(`plan_details.${index}.price`)}
                          sx={{ width: 99 }}
                          placeholder="Price"
                          value={plan.price}
                          onChange={(e) => {
                            plans[index].price = e.target.value;
                            setPlans([...plans]);
                          }}
                        />
                        <TextField
                          {...register(`plan_details.${index}.period`)}
                          select
                          sx={{ width: 176 }}
                          value={plan.period}
                          onChange={(e) => {
                            plans[index].period = e.target.value;
                            setPlans([...plans]);
                          }}
                        >
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </TextField>
                        <Stack
                          width={68}
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <IconButton
                            sx={{ width: 30, height: 30 }}
                            onClick={() => {
                              plans.splice(index, 1);
                              if (plans.length === 0)
                                setPlans([
                                  {
                                    plan_name: "",
                                    total_wishes: 0,
                                    price: "",
                                    period: "",
                                  },
                                ]);
                              else setPlans([...plans]);
                            }}
                          >
                            <SvgIcon>
                              <DeleteIcon />
                            </SvgIcon>
                          </IconButton>
                          {index === plans.length - 1 && (
                            <IconButton
                              sx={{ width: 30, height: 30 }}
                              onClick={() =>
                                setPlans([
                                  ...plans,
                                  {
                                    plan_name: "",
                                    total_wishes: 0,
                                    price: "",
                                    period: "",
                                  },
                                ])
                              }
                            >
                              <SvgIcon>
                                <PlustIcon />
                              </SvgIcon>
                            </IconButton>
                          )}
                        </Stack>
                      </Stack>
                    ))}
                  </Grid>
                </Grid>
              </FormProvider>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default PriceConfigurator;
