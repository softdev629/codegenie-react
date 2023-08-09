import { useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Divider,
  FormControl,
  TextField,
  SvgIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  LoginSocialGoogle,
  LoginSocialGithub,
  IResolveParams,
} from "reactjs-social-login";
import { LoadingButton } from "@mui/lab";

import BackSignin from "../../assets/back_signin.png";
import Logo from "../../logo.svg";

import { ReactComponent as GoogleIcon } from "../../assets/ico_google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/ico_facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/ico_twtter.svg";
import { ReactComponent as GithubIcon } from "../../assets/ico_github.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/ico_linkedin.svg";

import {
  useSigninUserMutation,
  useSocialAuthMutation,
} from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/store";
import { setModule } from "../../redux/features/genieSlice";

const signinSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export type SigninInput = TypeOf<typeof signinSchema>;

const SigninPage = () => {
  const [signinUser, signinState] = useSigninUserMutation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [authSocial, socialState] = useSocialAuthMutation();

  useEffect(() => {
    if (signinState.isSuccess) {
      toast.success("Login Success");
      if (!signinState.data.verified) navigate("/verify");
      else {
        if (signinState.data.role === "user") {
          localStorage.setItem("module", "All Code");
          dispatch(setModule("All Code"));
          navigate("/codegenie/all_code");
        } else {
          navigate("/admin/dashboard");
        }
      }
    }
    if (signinState.isError) {
      console.log(signinState);
      if (Array.isArray((signinState.error as any).data.detail)) {
        (signinState.error as any).data.detail.map((el: any) =>
          toast.error(`${el.loc[1]} ${el.msg}`)
        );
      } else toast.error((signinState.error as any).data.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signinState]);

  useEffect(() => {
    if (socialState.isSuccess) {
      toast.success("Social singup success");
      if (socialState.data.role === "user") {
        localStorage.setItem("module", "All Code");
        dispatch(setModule("All Code"));
        navigate("/codegenie/all_code");
      } else {
        navigate("/admin/dashboard");
      }
    }
    if (socialState.isError) {
      if (Array.isArray((socialState.error as any).data.detail)) {
        (socialState.error as any).data.detail.map((el: any) =>
          toast.error(`${el.loc[1]} ${el.msg}`)
        );
      } else toast.error((socialState.error as any).data.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialState]);

  const methods = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<SigninInput> = (values) => {
    signinUser(values);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container p={4}>
          <Grid item xs={6} position="relative">
            <img src={BackSignin} alt="Signup Background" />
            <Typography
              position="absolute"
              bottom={103}
              left={32}
              variant="h4"
              width={580}
              fontWeight={600}
              color="white"
            >
              Audit, Fix, Refactor, Document any Code Within Seconds
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Box
              position="absolute"
              left={"calc(50% - 225px)"}
              top={50}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <img width={44} height={44} src={Logo} alt="Logo" />
              <Typography variant="h5" fontWeight={600} color="text.secondary">
                CodeGenie
              </Typography>
            </Box>
            <Box width={450}>
              <Typography variant="h4" mb={4} color="text.secondary">
                Sign in your account
              </Typography>
              <FormProvider {...methods}>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Stack gap={3}>
                    <FormControl fullWidth>
                      <Typography mb={1} color="text.secondary">
                        Email address
                      </Typography>
                      <TextField
                        {...register("email")}
                        type="email"
                        placeholder="Enter your email"
                        error={!!errors["email"]}
                        helperText={errors["email"]?.message}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Stack
                        mb={1}
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography color="text.secondary">Password</Typography>
                        <Link
                          to="/forgot"
                          style={{
                            color: "#0168B5",
                            textDecoration: "none",
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </Stack>
                      <TextField
                        {...register("password")}
                        type="password"
                        placeholder="Enter your password"
                        error={!!errors["password"]}
                        helperText={errors["password"]?.message}
                      />
                    </FormControl>
                  </Stack>
                  <LoadingButton
                    loading={signinState.isLoading}
                    type="submit"
                    fullWidth
                    sx={{
                      height: 56,
                      background:
                        "linear-gradient(90deg, #036AB7 0%, #4BA5EB 100%)",
                      color: "white",
                      mt: 4,
                    }}
                  >
                    Log in
                  </LoadingButton>
                </Box>
              </FormProvider>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={1}
                height={44}
                mt={3}
              >
                <Divider sx={{ flexGrow: 1 }} />
                <Typography>Or</Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Stack>
              <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                <Box
                  width={56}
                  height={56}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #CACBCC"
                  borderRadius="50%"
                >
                  <LoginSocialGoogle
                    client_id={process.env.REACT_APP_GG_APP_ID || ""}
                    onResolve={({ provider, data }: IResolveParams) => {
                      if (data)
                        authSocial({
                          provider: provider as string,
                          email: data.email as string,
                          name: data.name as string,
                        });
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <SvgIcon>
                      <GoogleIcon />
                    </SvgIcon>
                  </LoginSocialGoogle>
                </Box>
                <Box
                  width={56}
                  height={56}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #CACBCC"
                  borderRadius="50%"
                >
                  <SvgIcon>
                    <FacebookIcon />
                  </SvgIcon>
                </Box>
                <Box
                  width={56}
                  height={56}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #CACBCC"
                  borderRadius="50%"
                >
                  <SvgIcon>
                    <TwitterIcon />
                  </SvgIcon>
                </Box>
                <Box
                  width={56}
                  height={56}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #CACBCC"
                  borderRadius="50%"
                >
                  <LoginSocialGithub
                    client_id={process.env.REACT_APP_GITHUB_APP_ID || ""}
                    client_secret={
                      process.env.REACT_APP_GITHUB_APP_SECRET || ""
                    }
                    onReject={(err) => console.log(err)}
                    redirect_uri={window.location.href}
                    onResolve={({ provider, data }: IResolveParams) => {
                      if (data)
                        authSocial({
                          provider: provider as string,
                          username: data.login as string,
                          name: data.name,
                        });
                    }}
                  >
                    <SvgIcon>
                      <GithubIcon />
                    </SvgIcon>
                  </LoginSocialGithub>
                </Box>
                <Box
                  width={56}
                  height={56}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #CACBCC"
                  borderRadius="50%"
                >
                  <SvgIcon>
                    <LinkedinIcon />
                  </SvgIcon>
                </Box>
              </Stack>
              <Typography mt={3}>
                New user?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#0168B5",
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SigninPage;
