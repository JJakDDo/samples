import { useState } from "react";
import { Avatar, Container, Box, Typography, Button } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Link as RouterLink } from "react-router-dom";
function SignUpSuccess() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CelebrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          You successfully signed up!
        </Typography>
        <Typography component="p" variant="body1" sx={{ textAlign: "center" }}>
          Login to explore!
        </Typography>

        <Button
          component={RouterLink}
          to="/userInquiry"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpSuccess;
