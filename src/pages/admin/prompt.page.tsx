import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Stack,
  Button,
  SvgIcon,
} from "@mui/material";

import { ReactComponent as PlustWhiteIcon } from "../../assets/ico_plus_white.svg";
import Prompt from "../../components/Prompt";
import { IPrompt } from "../../redux/api/types";
import { useGetProductsNamesQuery } from "../../redux/api/productApi";

const PromptConfigurator = () => {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [products, setProducts] = useState([]);

  const getNamesState = useGetProductsNamesQuery();

  return (
    <>
      <Box paddingY={5}>
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
          Prompt Configurator
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Stack marginTop={5} spacing={2}>
          <Stack alignItems="end">
            <Button
              variant="contained"
              sx={{ textTransform: "none", paddingY: 1, paddingX: 2 }}
              startIcon={
                <SvgIcon>
                  <PlustWhiteIcon />
                </SvgIcon>
              }
              onClick={() => {
                setPrompts([
                  ...prompts,
                  {
                    product: "",
                    plan: "",
                    module: "",
                    prompt_name: "",
                    order: 0,
                    prompt: "",
                  },
                ]);
              }}
            >
              Add prompt configuration settings
            </Button>
          </Stack>
          {prompts.map((prompt, index) => (
            <Prompt
              key={`prompt_box_${index}`}
              products={products}
              product={prompt.product}
              plan={prompt.plan}
              module={prompt.module}
              prompt_name={prompt.prompt_name}
              order={prompt.order}
              prompt={prompt.prompt}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default PromptConfigurator;
