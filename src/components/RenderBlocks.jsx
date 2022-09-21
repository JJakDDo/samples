import React from "react";
import {
  Typography,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";
import Parser from "html-react-parser";

function RenderBlocks({ blocks }) {
  console.log(blocks);
  if (!Object.keys(blocks).length) return null;

  return blocks?.map((block, index) => {
    switch (block.type) {
      case "header": {
        const { text, level } = block.data;
        return (
          <Typography
            variant={`h${level}`}
            gutterBottom
            key={block.id || index}
          >
            {Parser(text)}
          </Typography>
        );
      }
      case "paragraph": {
        const { text } = block.data;
        return (
          <Typography variant="body1" gutterBottom key={block.id || index}>
            {Parser(text)}
          </Typography>
        );
      }
      case "list": {
        const { items, style } = block.data;
        return (
          <List
            sx={{
              listStyleType: style === "unordered" ? "disc" : "decimal",
              padding: "0 24px",
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            {items.map((item, i) => {
              return (
                <ListItem key={`${block.id}${i}`}>{Parser(item)}</ListItem>
              );
            })}
          </List>
        );
      }
      case "table": {
        const { content } = block.data;
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {content.map((row, i) => (
                  <TableRow
                    key={`${block.id}${i}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {row.map((cell) => {
                      return (
                        <TableCell key={cell} component="th" scope="row">
                          {Parser(cell)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
      default: {
        return <React.Fragment key={`empty${index}`}></React.Fragment>;
      }
    }
  });
}

export default RenderBlocks;
