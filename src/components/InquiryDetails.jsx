import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { useStore } from "../store/store";
import { useParams, Link, useNavigate } from "react-router-dom";
import RenderBlocks from "../components/RenderBlocks";
import axios from "axios";
import Comments from "./Comments";
import { errorHandler } from "../utils/error";

function InquiryDetails({ admin }) {
  const inquiries = useStore((state) => state.inquiries);
  const jwt = useStore((state) => state.jwt);
  const [comments, setComments] = useState([]);
  const [commentInfoString, setCommentInfoString] = useState("No Comments...");
  const { id } = useParams();
  const responseRef = useRef(null);
  const index = inquiries.findIndex((inquiry) => inquiry.id === Number(id));
  const navigate = useNavigate();
  const setJwt = useStore((state) => state.setJwt);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);

  const getComments = useCallback(async () => {
    try {
      const url = admin
        ? "https://tessverso.io/api/inquiry/admin/details"
        : "https://tessverso.io/api/inquiry/details";
      const data = await axios.post(
        url,
        {
          inquiry_id: id,
        },
        {
          headers: {
            Authorization: `${jwt.token_type} ${jwt.access_token}`,
          },
        }
      );
      if (data.data.code === 0) {
        setComments(data.data.data.comments);
      } else {
        setCommentInfoString("Something went wrong... Please refresh the page");
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [admin, id, jwt]);

  const handleOnSubmitReply = async () => {
    try {
      const url = admin
        ? "https://tessverso.io/api/inquiry/admin/reply"
        : "https://tessverso.io/api/inquiry/reply";
      const data = await axios.post(
        url,
        {
          inquiry_id: id,
          response: responseRef.current.value,
          inquiry_category_id: inquiries[index].inquiry_category.id,
          inquiry_status_id: inquiries[index].inquiry_status.id,
        },
        {
          headers: {
            Authorization: `${jwt.token_type} ${jwt.access_token}`,
          },
        }
      );
      if (data.data.code === 0) {
        responseRef.current.value = "";
        getComments();
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

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={11}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
              1:1 Inquiry
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 8, width: "100%" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography component="p" variant="h6" sx={{ textAlign: "left" }}>
              Category
            </Typography>
          </Grid>
          <Divider sx={{ mb: 2, width: "100%" }} />
          <Grid
            component={Paper}
            item
            xs={12}
            sx={{ padding: 1, width: "100%", mb: 3 }}
          >
            <Typography component="p" variant="body1">
              {inquiries[index]?.inquiry_category.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography component="p" variant="h6">
              Title
            </Typography>
          </Grid>
          <Divider sx={{ mb: 2, width: "100%" }} />
          <Grid
            component={Paper}
            item
            xs={12}
            sx={{ padding: 1, width: "100%", mb: 3 }}
          >
            <Typography component="p" variant="body1">
              {inquiries[index]?.title}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Typography component="p" variant="h6">
              Contents
            </Typography>
          </Grid>
          <Divider sx={{ mb: 2, width: "100%" }} />

          <Grid
            component={Paper}
            item
            xs={12}
            sx={{ padding: 1, width: "100%", mb: 3 }}
          >
            <RenderBlocks
              blocks={JSON.parse(inquiries[index]?.contents)?.blocks}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            to={admin ? "/adminInquiry" : "/userInquiry"}
            variant="contained"
            sx={{ ml: 1, mr: 1 }}
          >
            Back to List
          </Button>
        </Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography component="p" variant="h6" sx={{ textAlign: "left" }}>
              Comments {comments.length}
            </Typography>
          </Grid>
          <Divider sx={{ mb: 2, width: "100%" }} />
          <Grid
            component={Paper}
            item
            xs={12}
            sx={{ padding: 1, width: "100%", mb: 3 }}
          >
            {comments.length ? (
              comments.map((comment, index) => {
                return <Comments key={index} {...comment} />;
              })
            ) : (
              <Typography
                component="p"
                variant="h6"
                sx={{ textAlign: "center" }}
              >
                {commentInfoString}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Please type the comments..."
              margin="normal"
              multiline
              minRows={2}
              inputRef={responseRef}
              fullWidth
            />
          </Grid>
          <Grid item xs={11}></Grid>
          <Grid item xs={1} sx={{ mb: 2 }}>
            <Button variant="contained" fullWidth onClick={handleOnSubmitReply}>
              Reply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default InquiryDetails;
