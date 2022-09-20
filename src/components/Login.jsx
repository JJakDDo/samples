import { useRef } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function Login({ setLoggedIn }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = pwRef.current.value;

    const data = await axios.post(
      "http://211.110.209.62/api/login",
      {
        email,
        password,
      },
      {
        headers: {
          withCredentials: true,
        },
      }
    );

    if (data.data.code === 0) {
      setLoggedIn(true);
    }
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
          로그인
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
            inputRef={emailRef}
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
            inputRef={pwRef}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
