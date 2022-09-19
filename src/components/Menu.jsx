import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
const drawerWidth = 150;
function Menu() {
  return (
    <Box sx={{ width: drawerWidth, display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {["Home", "Editor", "Otp"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={`/${index > 0 ? text.toLowerCase() : ""}`}>
                <h1>{text}</h1>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Menu;
