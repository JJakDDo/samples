import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import RenderBlocks from "../components/RenderBlocks";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my editor!",
          level: 1,
        },
      },
    ],
  };
};

const EDITOR_HOLDER_ID = "editorjs";

function Editor(props) {
  const ejInstance = useRef(null);
  const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
  const [editing, setEditing] = useState(false);

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
      },
    });
  };

  useEffect(() => {
    if (editing) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [editing]);

  return (
    <div>
      <button onClick={() => setEditing(true)}>수정</button>
      <button
        onClick={async () => {
          const outputData = await ejInstance.current.save();
          setEditing(false);
          setEditorData(outputData);
        }}
      >
        저장
      </button>
      {!editing && <RenderBlocks blocks={editorData.blocks} />}
      {editing && <div id={EDITOR_HOLDER_ID} />}
    </div>
  );
}

export default Editor;
