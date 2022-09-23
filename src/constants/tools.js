import Header from "@editorjs/header";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import Table from "@editorjs/table";
import SimpleImage from "../plugins/simple-image/simple-image";
import TessQuote from "../plugins/tess-quote/tess-quote";
import MarkerTool from "../plugins/tess-marker/tess-marker";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "type heading...",
    },
  },
  paragraph: {
    config: {
      placeholder: "type text...",
    },
  },
  list: List,
  table: Table,
  image: {
    class: SimpleImage,
    inlineToolbar: true,
  },
  quote: {
    class: TessQuote,
    inlineToolbar: true,
  },
  Marker: MarkerTool,
};
