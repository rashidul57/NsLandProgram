import { Paper } from "@mui/material";

const ErrorPageContent = () => {
  return (
    <Paper elevation={0} sx={{m: '100px', textAlign: 'center'}}>
      <h1>404!</h1>
      <p>
        Please double check if you have provided correct url.
      </p>
    </Paper>
);
}

export default ErrorPageContent;