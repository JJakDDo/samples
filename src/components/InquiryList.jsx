import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";

import axios from "axios";
import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { errorHandler } from "../utils/error";

function InquiryList({ admin, setTotalInquiries, offset }) {
  const jwt = useStore((state) => state.jwt);
  const inquiries = useStore((state) => state.inquiries);
  const setInquiries = useStore((state) => state.setInquiries);
  const setJwt = useStore((state) => state.setJwt);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const getInquiries = async () => {
      try {
        const url = admin
          ? "https://tessverso.io/api/inquiry/admin/all"
          : "https://tessverso.io/api/inquiry/all";
        const data = await axios.post(
          url,
          {
            offset,
            limit: 10,
          },
          {
            headers: {
              Authorization: `${jwt.token_type} ${jwt.access_token}`,
            },
          }
        );
        if (data.data.code === 0) {
          setTotalInquiries(data.data.data.total_count);
          setInquiries(data.data.data.inquiries);
        } else if (data.data.code === 2) {
          setLoggedIn(false);
          setAdminLoggedIn(false);
          setJwt("", "");
          alert("Not authorized. Please log in again", () =>
            navigate(admin ? "/adminInquiry" : "/userInquiry")
          );
        }
      } catch (error) {
        errorHandler(error, "Incorrect Code");
      }
    };

    if (jwt.access_token) {
      getInquiries();
    }
  }, [jwt]);

  return (
    <List sx={{ width: "100%" }}>
      <ListItem disablePadding>
        <Grid container>
          <Grid item xs={1}>
            <Typography
              component="p"
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              No.
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              component="p"
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              Title
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              component="p"
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              Created At
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              component="p"
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              Status
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider sx={{ mt: 2, width: "100%" }} />
      {inquiries.length ? (
        inquiries.map((inquiry, index) => {
          const { id, title, inquiry_status, created_at } = inquiry;
          let date = new Date(created_at);
          date = date.toISOString().substring(0, 10);
          return (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ mt: 1 }}>
                <ListItemButton
                  component={Link}
                  to={admin ? `/adminInquiry/${id}` : `/userInquiry/${id}`}
                  disableGutters
                >
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography
                        component="p"
                        variant="body1"
                        sx={{ textAlign: "center" }}
                      >
                        {id}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component="p" variant="body1">
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        component="p"
                        variant="body1"
                        sx={{ textAlign: "center" }}
                      >
                        {date}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        component="p"
                        variant="body1"
                        sx={{ textAlign: "center" }}
                      >
                        {inquiry_status.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ mt: 1, width: "100%" }} />
            </React.Fragment>
          );
        })
      ) : (
        <>
          <ListItem
            disablePadding
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          >
            <Typography component="p" variant="body1">
              No Inquiries...
            </Typography>
          </ListItem>
          <Divider sx={{ mt: 2, width: "100%" }} />
        </>
      )}
    </List>
  );
}

export default InquiryList;
