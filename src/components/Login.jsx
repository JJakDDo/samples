import { useState, useRef } from "react";
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
import { errorHandler } from "../utils/error";

function Login({ setLoggedIn, admin }) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const setJwt = useStore((state) => state.setJwt);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = pwRef.current.value;
    setEmailError(false);
    setPasswordError(false);
    setAdminLoggedIn(admin);

    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }
    try {
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

      switch (data.data.code) {
        case 0: {
          const { access_token, token_type } = data.data.data;

          setJwt(access_token, token_type);
          setLoggedIn(true);
          break;
        }
        case 1: {
          setShowError(true);
          break;
        }
        default: {
          throw new Error("Something went wrong...");
        }
      }
    } catch (error) {
      errorHandler(error);
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
              error={emailError}
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
              error={passwordError}
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
            {showError && (
              <Typography
                sx={{ textAlign: "center" }}
                color="error.main"
                component="p"
                variant="body2"
              >
                Email or password is incorrect. Please check again.
              </Typography>
            )}
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
