import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Stack,
  Card,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useVerifyEmailMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/store";
import { setModule } from "../../redux/features/genieSlice";

const verifySchema = object({
  code: string().min(1, "Verification code is required"),
});

export type VerifyInput = TypeOf<typeof verifySchema>;

const VerifyPage = () => {
  const [verifyEmail, verifyState] = useVerifyEmailMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<VerifyInput>({
    resolver: zodResolver(verifySchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<VerifyInput> = (values) => {
    verifyEmail(values);
  };

  useEffect(() => {
    if (verifyState.isSuccess) {
      toast.success("Verified successfully");
      localStorage.setItem("module", "All Code");
      dispatch(setModule("All Code"));
      navigate("/codegenie/all_code");
    }
    if (verifyState.isError) {
      if (Array.isArray((verifyState.error as any).data.detail)) {
        (verifyState.error as any).data.detail.map((el: any) =>
          toast.error(`${el.loc[1]} ${el.msg}`)
        );
      } else toast.error((verifyState.error as any).data.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyState]);

  return (
    <>
      <Container>
        <Stack height="100vh" justifyContent="center" alignItems="center">
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Card sx={{ padding: 6 }}>
                <Typography variant="h4" mb={2}>
                  Verification Code
                </Typography>
                <TextField
                  {...register("code")}
                  fullWidth
                  size="small"
                  placeholder="Verify code"
                  error={!!errors["code"]}
                  helperText={errors["code"]?.message}
                />
                <LoadingButton
                  fullWidth
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  loading={verifyState.isLoading}
                >
                  Send
                </LoadingButton>
              </Card>
            </Box>
          </FormProvider>
        </Stack>
      </Container>
    </>
  );
};

export default VerifyPage;
