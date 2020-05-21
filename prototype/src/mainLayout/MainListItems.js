import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StorageIcon from "@material-ui/icons/Storage";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import BorderClearIcon from "@material-ui/icons/BorderClear";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

export default function mainListItems(props) {
  return (
    <div>
      <ListItem button onClick={props.changeLayout.bind(null, "content")}>
        <ListItemIcon>
          <FolderSpecialIcon />
        </ListItemIcon>
        <ListItemText primary="Content" />
      </ListItem>
      <ListItem button onClick={props.changeLayout.bind(null, "documents")}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="10.000 fake data" />
      </ListItem>
      <ListItem button onClick={props.changeLayout.bind(null, "flat_planning")}>
        <ListItemIcon>
          <BorderClearIcon />
        </ListItemIcon>
        <ListItemText primary="Flat planning" />
      </ListItem>
      <ListItem button onClick={props.changeLayout.bind(null, "login")}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </div>
  );
}
