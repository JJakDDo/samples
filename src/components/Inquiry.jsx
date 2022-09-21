import { useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import InquiryList from "./InquiryList";
import CreateInquiry from "./CreateInquiry";

function Inquiry({ admin }) {
  const [showCreateInquiry, setShowCreateInquiry] = useState(false);
  const jwt = useStore((state) => state.jwt);
  const setJwt = useStore((state) => state.setJwt);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);

  const handleLogout = async () => {
    const url = admin
      ? "https://tessverso.io/api/admin/logout"
      : "https://tessverso.io/api/logout";
    const data = await axios.get(url, {
      headers: {
        Authorization: `${jwt.token_type} ${jwt.access_token}`,
      },
    });

    if (data.data.code === 0) {
      setLoggedIn(false);
      setAdminLoggedIn(false);
      setJwt("", "");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
              1:1 문의
            </Typography>
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && !admin && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => setShowCreateInquiry(true)}
              >
                문의하기
              </Button>
            )}
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && (
              <Button fullWidth variant="contained" onClick={handleLogout}>
                로그아웃
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 8, width: "100%" }} />
        {!showCreateInquiry ? (
          <InquiryList admin={admin} />
        ) : (
          <CreateInquiry setShowCreateInquiry={setShowCreateInquiry} />
        )}
      </Box>
    </Container>
  );
}

export default Inquiry;
