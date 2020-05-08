import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import DescriptionIcon from '@material-ui/icons/Description';
import BorderClearIcon from '@material-ui/icons/BorderClear';

export default function secondaryListItems() {
    return (
        <div>
            <ListSubheader inset>Saved reports</ListSubheader>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Current month"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Last quarter"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Year-end sale"/>
            </ListItem>
        </div>
    );
}