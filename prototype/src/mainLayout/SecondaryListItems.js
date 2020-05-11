import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

export default function secondaryListItems(props) {
    return (
        <div>
            <ListSubheader inset>Administration</ListSubheader>
            <ListItem button onClick={props.changeLayout.bind(null, "task")}>
                <ListItemIcon>
                    <FormatListBulletedIcon/>
                </ListItemIcon>
                <ListItemText primary="Tasks"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Not implemented"/>
            </ListItem>
            <ListItem button onClick={props.changeLayout.bind(null, "users")}>
                <ListItemIcon>
                    <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </ListItem>
        </div>
    );
}
