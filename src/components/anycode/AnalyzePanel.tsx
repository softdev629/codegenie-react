import {
  Box,
  Stack,
  Typography,
  SvgIcon,
  IconButton,
  Button,
  Divider,
} from "@mui/material";

import { ReactComponent as CopyIcon } from "../../assets/ico_copy.svg";
import { ReactComponent as ExportIcon } from "../../assets/ico_export.svg";

const AnalyzePanel = () => {
  return (
    <Stack gap="16px" height="100%">
      <Stack flexDirection="row">
        <Typography
          variant="h5"
          color="text.secondary"
          fontWeight="500"
          flexGrow={1}
        >
          Results
        </Typography>
        <Stack gap="16px" flexDirection="row">
          <IconButton>
            <SvgIcon>
              <CopyIcon />
            </SvgIcon>
          </IconButton>
          <Button
            startIcon={
              <SvgIcon>
                <ExportIcon />
              </SvgIcon>
            }
            variant="outlined"
            color="inherit"
            sx={(theme) => ({
              borderColor: theme.palette.divider,
            })}
          >
            Export
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <Box
        component="pre"
        sx={(theme) => ({
          whiteSpace: "pre-wrap",
          overflow: "auto",
          height: "calc(100vh - 400px)",
          "&.MuiBox-root::-webkit-scrollbar": {
            width: 4,
          },
          "&.MuiBox-root::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.divider,
            borderRadius: 4,
          },
          "&.MuiBox-root::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#fff",
          },
        })}
      >
        {`Like HTML, CSS is not a programming language. It's not a markup language either. CSS is a style sheet language. CSS is what you use to selectively style HTML elements. For example, this CSS selects paragraph text, setting the color to red:
CSSCopy to Clipboard
p {  color: red;}
Let's try it out! Using a text editor, paste the three lines of CSS (above) into a new file. Save the file as style.css in a directory named styles.

Open your index.html file. Paste the following line in the head (between the <head> and </head> tags):
HTMLCopy to Clipboard
<link href="styles/style.css" rel="stylesheet" />
Save index.html and load it in your browser. You should see something like this:

Like HTML, CSS is not a programming language. It's not a markup language either. CSS is a style sheet language. CSS is what you use to selectively style HTML elements. For example, this CSS selects paragraph text, setting the color to red:
CSSCopy to Clipboard
p {  color: red;}
Let's try it out! Using a text editor, paste the three lines of CSS (above) into a new file. Save the file as style.css in a directory named styles.

Open your index.html file. Paste the following line in the head (between the <head> and </head> tags):
HTMLCopy to Clipboard
<link href="styles/style.css" rel="stylesheet" />
Save index.html and load it in your browser. You should see something like this:
`}
      </Box>
    </Stack>
  );
};

export default AnalyzePanel;
