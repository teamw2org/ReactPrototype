import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import { Avatar } from "antd";

import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  span: {
    color: "rgb(2,146,156)",
    fontWeight: "bold",
    marginRight: "5px",
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
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
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItem key={Math.random()}>
                <span className={classes.span}>Name:</span> {data.name}
              </ListItem>
              <ListItem key={Math.random()}>
                <span className={classes.span}>Last name:</span> {data.lastname}
              </ListItem>
              <ListItem key={Math.random()}>
                <span className={classes.span}>Username:</span> {data.username}
              </ListItem>
              <ListItem key={Math.random()}>
                <span className={classes.span}>Retweet:</span> {data.retweet}
              </ListItem>
              <ListItem key={Math.random()}>
                <span className={classes.span}>Likes:</span> {data.likes}
              </ListItem>
            </div>
          </List>
        </div>
      )}
    </Dialog>
  );
}
