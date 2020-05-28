import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export default function secondaryListItems(props) {
  return (
    <div>
      <ListSubheader inset>Example Text</ListSubheader>
      <ListItem
        id="menuContentTreeGrid"
        button
        onClick={props.changeLayout.bind(null, "contentTreeGrid")}
        title="Content Tree Grid"
      >
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Content Tree Grid" />
      </ListItem>
      <ListItem
        id="menuTask"
        button
        onClick={props.changeLayout.bind(null, "task")}
        title="Custom Tree Grid"
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Tree Grid" />
      </ListItem>
      <ListItem
        id="menuUsers"
        button
        onClick={props.changeLayout.bind(null, "users")}
        title="Users"
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </div>
  );
}
