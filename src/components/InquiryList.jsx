import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const inquiries = [
  {
    id: 1,
    user: {
      name: "test@test.com",
      email: "test@test.com",
    },
    title: "문의사항입니다.",
    inquiry_category: {
      id: 1,
      name: "1번",
    },
    contents: "내용입니다.",
    areas_of_reciept: "",
    inquiry_status: {
      id: 1,
      name: "확인중",
    },
    created_at: "2022-09-10T02:00:00Z",
    updated_at: "2022-09-10T02:00:00Z",
  },
  {
    id: 2,
    user: {
      name: "test@test.com",
      email: "test@test.com",
    },
    title: "문의11111사항입니다.",
    inquiry_category: {
      id: 1,
      name: "1번",
    },
    contents: "내용입니다.",
    areas_of_reciept: "",
    inquiry_status: {
      id: 2,
      name: "완료",
    },
    created_at: "2022-09-12T02:00:00Z",
    updated_at: "2022-09-10T02:00:00Z",
  },
];

function InquiryList() {
  const jwt = useStore((state) => state.jwt);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const getInquiries = async () => {
      const data = await axios.post(
        "https://tessverso.io/api/inquiry/all",
        {
          offset: 0,
          limit: 10,
        },
        {
          headers: {
            Authorization: `${jwt.token_type} ${jwt.access_token}`,
          },
        }
      );
      console.log(data.data);
      if (data.data.code === 0) {
        setInquiries(data.data.data.inquiries);
      }
    };

    getInquiries();
  }, []);

  return (
    <List sx={{ width: "100%" }}>
      <ListItem disablePadding>
        <Grid container>
          <Grid item xs={1}>
            <Typography
              component='p'
              variant='body1'
              sx={{ textAlign: "center" }}
            >
              No.
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              component='p'
              variant='body1'
              sx={{ textAlign: "center" }}
            >
              제목
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              component='p'
              variant='body1'
              sx={{ textAlign: "center" }}
            >
              작성일
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              component='p'
              variant='body1'
              sx={{ textAlign: "center" }}
            >
              답변여부
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
                  to={`/userinquiry/${id}`}
                  disableGutters
                >
                  <Grid container>
                    <Grid item xs={1}>
                      <Typography
                        component='p'
                        variant='body1'
                        sx={{ textAlign: "center" }}
                      >
                        {id}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography component='p' variant='body1'>
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        component='p'
                        variant='body1'
                        sx={{ textAlign: "center" }}
                      >
                        {date}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        component='p'
                        variant='body1'
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
            <Typography component='p' variant='body1'>
              1:1 상담내역이 없습니다.
            </Typography>
          </ListItem>
          <Divider sx={{ mt: 2, width: "100%" }} />
        </>
      )}
    </List>
  );
}

export default InquiryList;
