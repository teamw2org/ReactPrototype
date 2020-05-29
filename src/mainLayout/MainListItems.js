import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StorageIcon from "@material-ui/icons/Storage";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import BorderClearIcon from "@material-ui/icons/BorderClear";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import MuseumIcon from "@material-ui/icons/Museum";

export default function mainListItems(props) {
  return (
    <div>
      <ListItem
        id="menuContent"
        button
        onClick={props.changeLayout.bind(null, "content")}
        title="Content"
      >
        <ListItemIcon>
          <FolderSpecialIcon />
        </ListItemIcon>
        <ListItemText primary="Content" />
      </ListItem>
      <ListItem
        id="menuDocuments"
        button
        onClick={props.changeLayout.bind(null, "documents")}
        title="10.000 items"
      >
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="10.000 items" />
      </ListItem>
      <ListItem
        id="menuFlat_planning"
        button
        onClick={props.changeLayout.bind(null, "flat_planning")}
        title="Flat planning"
      >
        <ListItemIcon>
          <BorderClearIcon />
        </ListItemIcon>
        <ListItemText primary="Flat planning" />
      </ListItem>
    </div>
  );
}
