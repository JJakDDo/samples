import React, { useState, useEffect, useRef, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import RenderBlocks from "../components/RenderBlocks";
import { Box, Button, Paper } from "@mui/material";
import axios from "axios";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../constants/tools";
import useFetch from "../hooks/useFetch";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [],
  };
};

const EDITOR_HOLDER_ID = "editorjs";
const ENDPOINT = "https://notion-page-api.herokuapp.com/api/v1/editor";

function Editor(props) {
  const ejInstance = useRef(null);
  const [editorData, setEditorData] = useState({});
  //console.log(editorData);
  const [editing, setEditing] = useState(false);
  const editorCore = useRef(null);

  const handleInitailze = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();

    await axios.post(ENDPOINT, savedData);
    setEditing(false);
    getData();
  }, []);

  const ReactEditorJS = createReactEditorJS();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      autoFocus: true,
      tools: {
        header: Header,
        list: List,
        table: Table,
      },
    });
  };
  const getData = async () => {
    const data = await axios.get(ENDPOINT);
    console.log(data.data);
    if (!data.data.blocks) {
      setEditorData(DEFAULT_INITIAL_DATA);
      return;
    }
    setEditorData(data.data);
  };

  // useEffect(() => {
  //   if (editing) {
  //     initEditor();
  //   }

  //   return () => {
  //     ejInstance.current?.destroy();
  //     ejInstance.current = null;
  //   };
  // }, [editing]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      {/* <Button variant="contained" onClick={() => setEditing(true)}>
        수정
      </Button> */}
      <Button
        variant="contained"
        onClick={async () => {
          // const outputData = await ejInstance.current.save();
          // console.log(outputData);
          // await axios.post("http://localhost:5000/api/v1/editor", outputData);
          // setEditing(false);
          // getData();
          //setEditorData(outputData);
          handleSave();
        }}
      >
        저장
      </Button>
      {/*!editing && (
        <Box
          component={Paper}
          ml={2}
          pl={4}
          pr={4}
          sx={{ width: "700px", minHeight: "800px" }}
        >
          <RenderBlocks blocks={editorData.blocks} />
        </Box>
      )}
      {editing && (
        <Box
          component={Paper}
          ml={2}
          pl={4}
          pr={4}
          sx={{ width: "700px", minHeight: "800px" }}
        >
          <ReactEditorJS
            onInitialize={handleInitailze}
            defaultValue={editorData}
            tools={EDITOR_JS_TOOLS}
          />
        </Box>
      )*/}
      <Box
        component={Paper}
        ml={2}
        pl={4}
        pr={4}
        sx={{ width: "700px", minHeight: "800px" }}
      >
        {/* <div id={EDITOR_HOLDER_ID} /> */}
        {editorData.blocks && (
          <ReactEditorJS
            onInitialize={handleInitailze}
            defaultValue={editorData}
            tools={EDITOR_JS_TOOLS}
            onReady={() => console.log(editorData)}
          />
        )}
      </Box>
    </Box>
  );
}

export default Editor;
