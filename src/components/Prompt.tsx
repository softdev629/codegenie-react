import { useEffect, useState } from "react";
import { Box, Stack, Typography, TextField, MenuItem } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

import {
  useLazyGetModulesQuery,
  useLazyGetPricesQuery,
} from "../redux/api/productApi";
import {
  useAddPromptMutation,
  useUpdatePromptMutation,
} from "../redux/api/promptApi";

const promptSchema = object({
  product: string(),
  plan: string().optional(),
  module: string(),
  prompt_name: string(),
  order: number(),
  prompt: string(),
});

export type IPromptSchema = TypeOf<typeof promptSchema>;

const Prompt = (props: {
  id: string;
  product: string;
  plan: string;
  module: string;
  prompt_name: string;
  order: number;
  prompt: string;
  products: string[];
}) => {
  const [plans, setPlans] = useState([props.plan]);
  const [modules, setModules] = useState([props.module]);

  const [getModules, modulesState] = useLazyGetModulesQuery();
  const [getPrices, pricesState] = useLazyGetPricesQuery();
  const [addPrompt, addState] = useAddPromptMutation();
  const [updatePrompt, updateState] = useUpdatePromptMutation();

  const methods = useForm<IPromptSchema>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      product: props.product,
      plan: props.plan,
      module: props.module,
      prompt_name: props.prompt_name,
      order: props.order,
      prompt: props.prompt,
    },
  });

  const { handleSubmit, getValues, register, setValue } = methods;

  useEffect(() => {
    if (props.product !== "") {
      getModules(props.product);
      getPrices({ product_name: props.product, product_module: props.module });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modulesState.isSuccess) {
      setModules(modulesState.data);
    }
  }, [modulesState]);

  useEffect(() => {
    if (pricesState.isSuccess) {
      if (pricesState.data)
        setPlans(pricesState.data.map((item) => item.plan_name));
      else {
        setPlans([""]);
        setValue("plan", "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricesState]);

  useEffect(() => {
    if (addState.isSuccess) toast.success("Prompt added successfully.");
  }, [addState]);

  useEffect(() => {
    if (updateState.isSuccess) toast.success("Prompt updated successfully.");
  }, [updateState]);

  const onSubmitHandler: SubmitHandler<IPromptSchema> = (
    values: IPromptSchema
  ) => {
    if (props.id === "") addPrompt(values);
    else updatePrompt({ id: props.id, info: values });
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box
          padding={4}
          border="1px solid #CACBCC"
          borderRadius={1}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Stack alignItems="end">
            <LoadingButton variant="contained" sx={{ mb: 2 }} type="submit">
              Save
            </LoadingButton>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography width={181}>Products</Typography>
            <Typography width={216}>Plans</Typography>
            <Typography width={216}>Module</Typography>
            <Typography width={216}>Prompt name</Typography>
            <Typography width={184}>Feature list order</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <TextField
              {...register("product")}
              sx={{ width: 181 }}
              size="small"
              select
              defaultValue={props.product}
              onChange={(event) => {
                getModules(event.target.value);
              }}
            >
              {props.products.map((product, index) => (
                <MenuItem key={`product_item_${index}`} value={product}>
                  {product}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("plan")}
              sx={{ width: 216 }}
              size="small"
              select
              defaultValue={props.plan}
            >
              {plans.map((plan, index) => (
                <MenuItem key={`plan_item_${index}`} value={plan}>
                  {plan}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("module")}
              sx={{ width: 216 }}
              size="small"
              select
              defaultValue={props.module}
              onChange={(event) => {
                let product_name = getValues("product");
                getPrices({
                  product_name: product_name,
                  product_module: event.target.value,
                });
              }}
            >
              {modules.map((module, index) => (
                <MenuItem key={`module_item_${index}`} value={module}>
                  {module}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("prompt_name")}
              sx={{ width: 216 }}
              size="small"
              defaultValue={props.prompt_name}
            ></TextField>
            <TextField
              {...register("order", { valueAsNumber: true })}
              sx={{ width: 184 }}
              size="small"
              type="number"
              defaultValue={props.order}
            ></TextField>
          </Stack>
          <Stack flexDirection="row" justifyContent="flex-end">
            <Typography width={184}>Note: 3rd listed in UI</Typography>
          </Stack>
          <Typography>Prompt</Typography>
          <TextField
            {...register("prompt")}
            fullWidth
            multiline
            rows={4}
            defaultValue={props.prompt}
          />
        </Box>
      </FormProvider>
    </>
  );
};

export default Prompt;
