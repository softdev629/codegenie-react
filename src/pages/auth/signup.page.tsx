import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  SvgIcon,
  Divider,
  FormControl,
  TextField,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  LoginSocialGoogle,
  LoginSocialGithub,
  IResolveParams,
} from "reactjs-social-login";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { ReactComponent as GoogleIcon } from "../../assets/ico_google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/ico_facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/ico_twtter.svg";
import { ReactComponent as GithubIcon } from "../../assets/ico_github.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/ico_linkedin.svg";

import BackSignup from "../../assets/back_signup.png";
import Logo from "../../assets/logo_white.png";

import {
  useSignupUserMutation,
  useSocialAuthMutation,
} from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/store";
import { setModule } from "../../redux/features/genieSlice";

const signupSchema = object({
  name: string().min(1, "Full name is required"),
  email: string()
    .min(1, "Email address is required")
    .email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type SignupInput = TypeOf<typeof signupSchema>;

const SignupPage = () => {
  const [termsCheck, setTermsCheck] = useState(false);

  const [authSocial, socialState] = useSocialAuthMutation();
  const [signupUser, signupState] = useSignupUserMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const methods = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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

  useEffect(() => {
    if (signupState.isSuccess) {
      toast.success("User created successfully");
      navigate("/signin");
    }
    if (signupState.isError) {
      if (Array.isArray((signupState.error as any).data.detail)) {
        (signupState.error as any).data.detail.map((el: any) =>
          toast.error(`${el.loc[1]} ${el.msg}`)
        );
      } else toast.error((signupState.error as any).data.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupState]);

  const onSubmitHandler: SubmitHandler<SignupInput> = (values) => {
    signupUser(values);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container p={4}>
          <Grid item xs={6} position="relative">
            <img src={BackSignup} alt="Signup Background" />
            <Box
              position="absolute"
              left={32}
              top={50}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <img src={Logo} alt="Logo" />
              <Typography variant="h5" fontWeight={600} color="white">
                CodeGenie
              </Typography>
            </Box>
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
          >
            <Box width={450}>
              <Typography color="text.secondary" variant="h4" fontWeight={600}>
                Create an account
              </Typography>
              <Typography color="text.secondary" mt={4}>
                Sign up with social
              </Typography>
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
              <FormProvider {...methods}>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Stack gap={3}>
                    <FormControl fullWidth>
                      <Typography mb={1} color="text.secondary">
                        Name
                      </Typography>
                      <TextField
                        {...register("name")}
                        placeholder="Enter full name"
                        error={!!errors["name"]}
                        helperText={errors["name"]?.message}
                      />
                    </FormControl>
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
                      <Typography mb={1} color="text.secondary">
                        Password
                      </Typography>
                      <TextField
                        {...register("password")}
                        type="password"
                        placeholder="min 8 characters"
                        error={!!errors["password"]}
                        helperText={errors["password"]?.message}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Typography mb={1} color="text.secondary">
                        Confirm Password
                      </Typography>
                      <TextField
                        {...register("passwordConfirm")}
                        type="password"
                        placeholder="Same as previous"
                        error={!!errors["passwordConfirm"]}
                        helperText={errors["passwordConfirm"]?.message}
                      />
                    </FormControl>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        value={termsCheck}
                        onChange={(e) => setTermsCheck(e.target.checked)}
                      />{" "}
                      <Typography>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          style={{
                            color: "#0168B5",
                          }}
                        >
                          Terms & Privacy Policy
                        </Link>
                      </Typography>
                    </Box>
                  </Stack>
                  <LoadingButton
                    fullWidth
                    sx={{
                      height: 56,
                      background:
                        "linear-gradient(90deg, #036AB7 0%, #4BA5EB 100%)",
                      color: "white",
                      mt: 4,
                    }}
                    loading={signupState.isLoading}
                    type="submit"
                    disabled={!termsCheck}
                  >
                    Sign Up
                  </LoadingButton>
                </Box>
              </FormProvider>
              <Typography mt={3}>
                Have an account?{" "}
                <Link
                  to="/signin"
                  style={{
                    color: "#0168B5",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignupPage;
