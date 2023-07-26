import {
  FormHelperText,
  FormControl,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({
  name,
  defaultValue,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField {...field} error={!!errors[name]} {...otherProps} />
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? errors[name]?.message?.toString() : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
