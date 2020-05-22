import React from "react";
import "./FlatPlanner.style.css";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import MuuriComponent from "./Muuri.component";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#00B0BC",
    "&$checked": {
      color: "#00B0BC",
    },
    "&$checked + $track": {
      backgroundColor: "#00676C",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
  }

  render() {
    return (
      <div id="mainContent">
        <Typography component="div" style={{ marginLeft: "14px" }}>
          <Grid
            component="label"
            container
            alignItems="center"
            spacing={1}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Grid item>Basic</Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <PurpleSwitch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    name="checkedA"
                  />
                }
                label="Print"
              />
            </Grid>
          </Grid>
        </Typography>
        <MuuriComponent checkState={this.state.checked} />
      </div>
    );
  }
}
