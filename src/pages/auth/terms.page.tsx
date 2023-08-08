import { Box, Typography, Container, Divider, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";

const TermsPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Box py={5}>
          <Typography
            variant="h2"
            color="text.secondary"
            fontWeight={600}
            textAlign="center"
            mb={10}
          >
            Code Genie Terms of Service
          </Typography>
          <Typography>
            Last Updated: August 3, 2023
            <br />
            <br />
            These Terms of Service ("Terms") govern your access to and use of
            Code Genie, a product owned and operated by OceSha, Inc., a Florida
            company ("we," "our," or "us"). Please read these Terms carefully
            before using Code Genie.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            1. Acceptance of Terms
          </Typography>
          <Typography>
            By accessing or using Code Genie, you agree to be bound by these
            Terms. If you do not agree with these Terms, you must not access or
            use Code Genie.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            2. Registration
          </Typography>
          <Typography>
            You may be required to register for an account to use certain
            features of Code Genie. You agree to provide accurate and complete
            information during registration and to keep your account information
            up to date.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            3. Use of Code Genie
          </Typography>
          <Typography>
            You agree to use Code Genie in accordance with all applicable laws
            and regulations. You may not:
            <Box component="ul">
              <Box component="li">
                Use Code Genie for any unlawful or fraudulent purpose
              </Box>
              <Box component="li">
                Interfere with or disrupt the operation of Code Genie
              </Box>
              <Box component="li">
                Reverse engineer, decompile, or disassemble Code Genie
              </Box>
              <Box component="li">
                Use Code Genie in a way that infringes the rights of others
              </Box>
            </Box>
          </Typography>

          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            4. Intellectual Property
          </Typography>
          <Typography>
            Code Genie and its content, features, and functionality are owned by
            OceSha, Inc. and are protected by intellectual property laws. You
            are granted a limited, non-exclusive, non-transferable license to
            use Code Genie for your personal or business use. You may not
            reproduce, distribute, or create derivative works of Code Genie
            without our express written permission.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            5. User Content
          </Typography>
          <Typography>
            You may be able to submit content to Code Genie, such as code,
            comments, and feedback. You retain ownership of your content, but
            you grant us a worldwide, royalty-free license to use, reproduce,
            modify, and distribute your content as necessary to provide Code
            Genie.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            6. Termination
          </Typography>
          <Typography>
            We may terminate or suspend your access to Code Genie at our sole
            discretion, without notice, for conduct that we believe violates
            these Terms or is harmful to us, other users of Code Genie, or third
            parties, or for any other reason.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            7. Disclaimers
          </Typography>
          <Typography>
            Code Genie is provided "as is" and "as available" without any
            warranties of any kind, either express or implied. We do not warrant
            that Code Genie will be uninterrupted, error-free, or free of
            harmful components.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            8. Limitation of Liability
          </Typography>
          <Typography>
            To the fullest extent permitted by law, OceSha, Inc. shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, arising out of or in connection
            with your use of Code Genie.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            9. Governing Law
          </Typography>
          <Typography>
            These Terms are governed by the laws of the State of Delaware, USA,
            without regard to its conflict of law principles.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            10. Changes to Terms
          </Typography>
          <Typography>
            We may revise these Terms from time to time. We will notify you of
            any changes by posting the updated Terms on this page. Your
            continued use of Code Genie after the changes are posted constitutes
            your acceptance of the new Terms.
          </Typography>
          <Typography variant="h4" color="text.secondary" mt={5} mb={2}>
            11. Contact Us
          </Typography>
          <Typography>
            If you have any questions or concerns about these Terms, please
            contact us at:
            <br />
            <br />
            OceSha, Inc.
            <br />
            Los Angeles, Ca
            <br />
            310-748-8901
            <br />
            support@ocesha.com
          </Typography>
          <Divider sx={{ my: 5 }} />
          <Typography>
            By using Code Genie, you acknowledge that you have read, understood,
            and agree to be bound by these Terms. If you do not agree with these
            Terms, please do not use Code Genie.
          </Typography>
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
      </Container>
    </>
  );
};

export default TermsPage;
