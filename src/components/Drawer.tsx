import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

type CustomDrawerProps = {
  navbarHeight: number;
};

export default function CustomDrawer({ navbarHeight }: CustomDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleDrawer = () => {
    setIsExpanded((prev) => !prev);
  };
  console.log(navbarHeight);
  const drawerWidth = isExpanded ? 200 : 72;
  const list = () => (
    <Box sx={{ width: 200, position: "relative" }}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor={"left"}
      open={true}
      variant="permanent"
      sx={{
        // position: "absolute",

        width: drawerWidth,
        height: `${100 - navbarHeight}`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: navbarHeight,
          //   backgroundColor: "red",
          height: `${100 - navbarHeight}`,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isExpanded ? "flex-end" : "center",
          alignItems: "center",
          p: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      {list()}
    </Drawer>
  );
}
