import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { EDITOR_JS_TOOLS } from "../constants/tools";
import { createReactEditorJS } from "react-editor-js";

import {
  Typography,
  Grid,
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
  const jwt = useStore((state) => state.jwt);
  const editorCore = useRef(null);

  const ReactEditorJS = createReactEditorJS();

  const handleInitailze = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const saveContents = useCallback(async () => {
    const savedData = await editorCore.current.save();
    return savedData;
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleOnSubmitInquiry = async () => {
    const savedContents = await saveContents();
    const data = await axios.post(
      "https://tessverso.io/api/inquiry/create",
      {
        title: titleRef.current.value,
        contents: JSON.stringify(savedContents),
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
      // const data = await axios.post(
      //   "https://tessverso.io/api/refresh",
      //   {},
      //   {
      //     headers: {
      //       Authorization: `${jwt.token_type} ${jwt.access_token}`,
      //     },
      //   }
      // );
    }

    if (data.data.code === 0) {
      setShowCreateInquiry(false);
    }
  };

  const getAllCategory = async () => {
    const data = await axios.get("https://tessverso.io/api/inquiry/categories");
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
        width: "80%",
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
            Category
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="select-label">Select One.</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={selectedCategory}
              label="Select One."
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
            Title
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
            alignItems: "top",
          }}
        >
          <Typography component="p" variant="body1">
            Contents
          </Typography>
        </Grid>
        <Grid item xs={10}>
          {/* <TextField
            margin='normal'
            multiline
            minRows={8}
            fullWidth
            inputRef={contentsRef}
          /> */}
          <Box
            sx={{
              border: 1,
              borderColor: "grey.400",
              borderRadius: 1,
              padding: 1,
              minHeight: "300px",
            }}
          >
            <ReactEditorJS
              onInitialize={handleInitailze}
              tools={EDITOR_JS_TOOLS}
              minHeight={0}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{ ml: 1, mr: 1 }}
          onClick={handleOnSubmitInquiry}
        >
          Send
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ ml: 1, mr: 1 }}
          onClick={() => setShowCreateInquiry(false)}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
}

export default CreateInquiry;
