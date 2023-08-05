import {
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  SvgIcon,
  Divider,
} from "@mui/material";

import { ReactComponent as GoogleIcon } from "../../assets/ico_google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/ico_facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/ico_twtter.svg";
import { ReactComponent as GithubIcon } from "../../assets/ico_github.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/ico_linkedin.svg";

import BackSignup from "../../assets/back_signup.png";
import Logo from "../../assets/logo_white.png";

const SignupPage = () => {
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
                  <SvgIcon>
                    <GoogleIcon />
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
                  <SvgIcon>
                    <GithubIcon />
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignupPage;
