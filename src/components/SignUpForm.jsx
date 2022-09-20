import { useRef } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function SignUpForm({ setShowEmailVerify, setEmail, setPw }) {
  const emailInput = useRef(null);
  const pwInput = useRef(null);
  const handleSignUp = async () => {
    await axios.post("//211.110.209.62/api/get_code", {
      email: emailInput.current.value,
    });
    setShowEmailVerify(true);
    setEmail(emailInput.current.value);
    setPw(pwInput.current.value);
  };
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
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={pwInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            계정 생성
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpForm;
