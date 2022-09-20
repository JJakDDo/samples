import { useEffect, useState, useRef } from "react";
import { useStore } from "../store/store";
import axios from "axios";

import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Button,
} from "@mui/material";

function CreateInquiry({ setShowCreateInquiry }) {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const titleRef = useRef(null);
  const contentsRef = useRef(null);
  const jwt = useStore((state) => state.jwt);
  const setJwt = useStore((state) => state.setJwt);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleOnSubmitInquiry = async () => {
    console.log(jwt);
    const data = await axios.post(
      "http://211.110.209.62/api/inquiry/create",
      {
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        inquiry_category_id: selectedCategory,
        areas_of_receipt: "",
        inquiry_status_id: 1,
      },
      {
        headers: {
          Authorization: `${jwt.token_type} ${jwt.access_token}`,
        },
      }
    );

    if (data.data.code === 2) {
      const data = await axios.post(
        "http://211.110.209.62/api/refresh",
        {},
        {
          headers: {
            Authorization: `${jwt.token_type} ${jwt.access_token}`,
          },
        }
      );
      console.log(data);
    }

    if (data.data.code === 0) {
      setShowCreateInquiry(false);
    }
  };

  const getAllCategory = async () => {
    const data = await axios.get(
      "http://211.110.209.62/api/inquiry/categories"
    );
    if (data.data.code === 0) {
      setCategory(data.data.data);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="p"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            상담분류
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="select-label">선택하세요.</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectedCategory}
              label="선택하세요."
              onChange={handleChange}
            >
              {category.map((item, index) => {
                return (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="p" variant="body1">
            제목
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField margin="normal" fullWidth inputRef={titleRef} />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="p" variant="body1">
            내용
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            margin="normal"
            multiline
            minRows={8}
            fullWidth
            inputRef={contentsRef}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{ ml: 1, mr: 1 }}
          onClick={handleOnSubmitInquiry}
        >
          문의하기
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ ml: 1, mr: 1 }}
          onClick={() => setShowCreateInquiry(false)}
        >
          목록보기
        </Button>
      </Box>
    </Box>
  );
}

export default CreateInquiry;