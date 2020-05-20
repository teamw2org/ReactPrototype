import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Avatar } from "antd";

import { blue } from "@material-ui/core/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {data && (
        <div style={{ padding: "5px" }}>
          <List style={{ display: "flex" }}>
            <Avatar
              size={200}
              src={`https://i.picsum.photos/id/${data.imgNr}/198/300.jpg`}
            />
            <div
              style={{
                background:
                  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(210,210,210,1) 50%, rgba(255,255,255,1) 100%)",
                width: "2px",
                marginLeft: "10px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItem key={Math.random()}>Name: {data.name}</ListItem>
              <ListItem key={Math.random()}>
                Last name: {data.lastname}
              </ListItem>
              <ListItem key={Math.random()}>Username: {data.username}</ListItem>
              <ListItem key={Math.random()}>Retweet: {data.retweet}</ListItem>
              <ListItem key={Math.random()}>Likes: {data.likes}</ListItem>
            </div>
          </List>
        </div>
      )}
    </Dialog>
  );
}
