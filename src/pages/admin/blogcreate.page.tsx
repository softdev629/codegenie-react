import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";

const ContentGenerator = () => {
  const [options] = useState([]);

  return (
    <>
      <Box
        paddingY={5}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
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
          Search Content
        </Typography>
        <Autocomplete
          options={options}
          sx={{ width: 680, paddingTop: 5 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type & search or select prompt from list"
              size="small"
            />
          )}
        />
      </Box>
      <Divider />
      <Container></Container>
    </>
  );
};

export default ContentGenerator;
