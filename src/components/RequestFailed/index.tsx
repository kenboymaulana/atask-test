import React from "react";
import { Typography } from "@mui/material";

const RequestFailed = () => {
  return (
    <div style={{textAlign: 'center'}}>
    <Typography variant="h6" sx={{ color: 'grey.600' }}>
      Oops, Sorry.
    </Typography>
    <Typography variant="body2" sx={{ color: 'grey.600', fontSize: 16 }}>
      Request failed. Please wait and try again.
    </Typography>
    </div>
  );
};

export default RequestFailed;
