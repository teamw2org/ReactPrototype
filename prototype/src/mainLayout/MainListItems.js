import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import DescriptionIcon from '@material-ui/icons/Description';
import BorderClearIcon from '@material-ui/icons/BorderClear';

export default function mainListItems(props){
    return (
    <div>
        <ListItem button onClick={props.changeLayout.bind(null, "publication")}>
            <ListItemIcon>
                <FolderSpecialIcon />
            </ListItemIcon>
            <ListItemText primary="Publication" />
        </ListItem>
        <ListItem button onClick={props.changeLayout.bind(null, "documents")}>
            <ListItemIcon>
                <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Documents" />
        </ListItem>
        <ListItem button onClick={props.changeLayout.bind(null, "flat_planning")}>
            <ListItemIcon>
                <BorderClearIcon />
            </ListItemIcon>
            <ListItemText primary="Flat planning" />
        </ListItem>
    </div>
);
}