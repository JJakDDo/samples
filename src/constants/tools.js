import Header from "@editorjs/header";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import Table from "@editorjs/table";

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
};
