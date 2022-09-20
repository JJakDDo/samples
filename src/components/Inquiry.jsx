import { useState } from "react";
import { useStore } from "../store/store";

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

function Inquiry() {
  const [showCreateInquiry, setShowCreateInquiry] = useState(false);
  const jwt = useStore((state) => state.jwt);
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
        <Grid container>
          <Grid item xs={11}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
              1:1 문의
            </Typography>
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => setShowCreateInquiry(true)}
              >
                문의하기
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 8, width: "100%" }} />
        {!showCreateInquiry ? (
          <InquiryList />
        ) : (
          <CreateInquiry setShowCreateInquiry={setShowCreateInquiry} />
        )}
      </Box>
    </Container>
  );
}

export default Inquiry;
