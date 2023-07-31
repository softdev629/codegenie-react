import { useState } from "react";
import { Box, Stack, Typography, TextField, MenuItem } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import { IPrompt } from "../redux/api/types";

const Prompt = (props: {
  product: string;
  plan: string;
  module: string;
  prompt_name: string;
  order: number;
  prompt: string;
  products: string[];
}) => {
  const [plans, setPlans] = useState([""]);
  const [modules, setModules] = useState([""]);

  return (
    <>
      <Box
        padding={4}
        border="1px solid #CACBCC"
        borderRadius={1}
        component="form"
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
          <TextField
            sx={{ width: 181 }}
            size="small"
            select
            defaultValue={props.product}
          >
            {props.products.map((product, index) => (
              <MenuItem key={`product_item_${index}`} value={product}>
                {product}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            sx={{ width: 216 }}
            size="small"
            select
            defaultValue={props.module}
          >
            {modules.map((module, index) => (
              <MenuItem key={`plan_item_${index}`} value={module}>
                {module}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ width: 216 }}
            size="small"
            defaultValue={props.prompt_name}
          ></TextField>
          <TextField
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
        <TextField fullWidth multiline rows={4} defaultValue={props.prompt} />
      </Box>
    </>
  );
};

export default Prompt;
