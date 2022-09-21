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
import { useStore } from "../store/store";

function Login({ setLoggedIn, admin }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const setJwt = useStore((state) => state.setJwt);

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = pwRef.current.value;

    const url = admin
      ? "https://tessverso.io/api/admin/login"
      : "https://tessverso.io/api/login";
    const body = admin
      ? {
          username: email,
          password,
        }
      : {
          email,
          password,
        };
    const data = await axios.post(url, body);

    if (data.data.code === 0) {
      console.log(data.data);
      const { access_token, token_type } = data.data.data;

      setJwt(access_token, token_type);
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
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form>
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
          </form>

          {!admin && (
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
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
