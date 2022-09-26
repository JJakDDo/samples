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
  Pagination,
} from "@mui/material";
import InquiryList from "./InquiryList";
import CreateInquiry from "./CreateInquiry";
import Modals from "./Modals";
import { errorHandler } from "../utils/error";
import { useNavigate } from "react-router-dom";

function Inquiry({ admin }) {
  const [showCreateInquiry, setShowCreateInquiry] = useState(false);
  const jwt = useStore((state) => state.jwt);
  const setJwt = useStore((state) => state.setJwt);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);
  const [page, setPage] = useState(1);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = admin
      ? "https://tessverso.io/api/admin/logout"
      : "https://tessverso.io/api/logout";
    try {
      const data = await axios.get(url, {
        headers: {
          Authorization: `${jwt.token_type} ${jwt.access_token}`,
        },
      });

      if (data.data.code === 0) {
        setLoggedIn(false);
        setAdminLoggedIn(false);
        setJwt("", "");
      } else if (data.data.code === 2) {
        setLoggedIn(false);
        setAdminLoggedIn(false);
        setJwt("", "");
        alert("Not authorized. Please log in again", () =>
          navigate(admin ? "/adminInquiry" : "/userInquiry")
        );
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Modals
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
      />
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
          <Grid item xs={7}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
              1:1 Inquiry
            </Typography>
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && admin && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setShowModal(true);
                  setModalType("category");
                }}
              >
                Category
              </Button>
            )}
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && admin && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setShowModal(true);
                  setModalType("status");
                }}
              >
                Status
              </Button>
            )}
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && !admin && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => setShowCreateInquiry(true)}
              >
                Inquiry
              </Button>
            )}
          </Grid>
          <Grid item xs>
            {!showCreateInquiry && (
              <Button fullWidth variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 8, width: "100%" }} />
        {!showCreateInquiry ? (
          <>
            <InquiryList
              offset={10 * (page - 1)}
              admin={admin}
              setTotalInquiries={setTotalInquiries}
            />
            <Pagination
              count={Math.ceil(totalInquiries / 10)}
              color="primary"
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </>
        ) : (
          <CreateInquiry setShowCreateInquiry={setShowCreateInquiry} />
        )}
      </Box>
    </Container>
  );
}

export default Inquiry;
