import React from "react";

import { Container, Box, Grid, Typography, Divider } from "@mui/material";

function InquiryDetails() {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          marginTop: 8,
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={11}>
            <Typography component='h1' variant='h5' sx={{ marginBottom: 1 }}>
              1:1 문의
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 8, width: "100%" }} />
      </Box>
    </Container>
  );
}

export default InquiryDetails;
