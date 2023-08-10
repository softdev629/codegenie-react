import {
  Container,
  Grid,
  Stack,
  Typography,
  FormControl,
  TextField,
  Box,
  SvgIcon,
} from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BackSignin from "../../assets/back_signin.png";
import Logo from "../../logo.svg";
import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { LoadingButton } from "@mui/lab";

const ForgotPage = () => {
  const [email, setEmail] = useState("");

  const [resetPassword, resetState] = useResetPasswordMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (resetState.isSuccess) {
      toast.success("Password reset!");
      navigate("/signin");
    }
    if (resetState.isError) {
      if (Array.isArray((resetState.error as any).data.detail)) {
        (resetState.error as any).data.detail.map((el: any) =>
          toast.error(`${el.loc[1]} ${el.msg}`)
        );
      } else toast.error((resetState.error as any).data.detail);
    }
  }, [resetState]);

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
              <Typography variant="h4" mb={1} color="text.secondary">
                Forgot password?
              </Typography>
              <Typography mb={4}>
                No worries, we will send you reset instructions
              </Typography>
              <Stack gap={3}>
                <FormControl fullWidth>
                  <Typography mb={1} color="text.secondary">
                    Email address
                  </Typography>
                  <TextField
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    error={email === ""}
                    helperText={email === "" ? "Email address is required" : ""}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
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
                onClick={() => {
                  if (email === "") return;
                  resetPassword({ email });
                }}
                loading={resetState.isLoading}
              >
                Reset Password
              </LoadingButton>

              <Link
                to="/signin"
                style={{
                  display: "flex",
                  marginTop: 40,
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <KeyboardBackspace />
                </SvgIcon>
                Back to log in
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ForgotPage;
