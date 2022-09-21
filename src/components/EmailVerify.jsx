import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SignUpSuccess from "./SignUpSuccess";
import CustomCodeInput from "./CustomCodeInput";

function EmailVerify({ setShowEmailVerify, email, pw }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const codeRefs = useRef([]);

  useEffect(() => {
    if (codeRefs.current.length) {
      codeRefs.current[0].focus();
    }
  }, []);

  const checkAllCodeFilled = () => {
    return codeRefs.current.every((code) => code.value !== "");
  };

  const handleCodeInputChange = async (e, index) => {
    if (checkAllCodeFilled()) {
      const code = codeRefs.current.map((code) => code.value).join("");
      setLoading(true);
      const data = await axios.post("https://tessverso.io/api/verify_code", {
        email,
        code,
      });

      if (data.data.code === 0) {
        console.log(data);
        const { verified_token } = data.data.data;
        const registerData = await axios.post(
          "https://tessverso.io/api/register",
          {
            name: email,
            password: pw,
            verified_token,
          }
        );
        if (registerData.data.code === 0) {
          setShowSuccess(true);
        }
      } else if (data.data.code === 4) {
        setOpen(true);
      }
      setLoading(false);
    }

    if (codeRefs.current[index].value !== "") {
      codeRefs.current[index === 5 ? index : index + 1].focus();
    }
  };

  if (showSuccess) {
    return <SignUpSuccess />;
  }

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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            This is an error alert — check it out!
          </Alert>
        </Snackbar>
        <Grid container>
          <Grid item xs>
            <ArrowBackIcon onClick={() => setShowEmailVerify(false)} />
          </Grid>
        </Grid>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          Verify Your Email
        </Typography>
        <Typography component="p" variant="body1" sx={{ textAlign: "center" }}>
          We’ve sent an email to with a link to verify your email. You may click
          the button in the email or enter the verification code below.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={0}
                onChange={handleCodeInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={1}
                onChange={handleCodeInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={2}
                onChange={handleCodeInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={3}
                onChange={handleCodeInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={4}
                onChange={handleCodeInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomCodeInput
                codeRefs={codeRefs}
                index={5}
                onChange={handleCodeInputChange}
              />
            </Grid>
          </Grid>
          {loading && (
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Resend Email
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EmailVerify;
