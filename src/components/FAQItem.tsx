import { useState } from "react";
import { Typography, Stack, IconButton, Collapse, Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const FAQItem = (props: { title: string; content: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box px={4} py={3}>
        <Stack flexDirection="row" justifyContent="center" mb={1}>
          <Typography
            variant="h5"
            flexGrow={1}
            color={open ? "primary.main" : "text.secondary"}
            fontWeight={600}
          >
            {props.title}
          </Typography>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Stack>
        <Collapse in={open}>
          <Typography variant="h5">{props.content}</Typography>
        </Collapse>
      </Box>
    </>
  );
};

export default FAQItem;
