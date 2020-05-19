import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { lighten, makeStyles } from "@material-ui/core/styles";

// TreeCell.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

export default function TreeCell(props) {
  const { classes, column, onRequestSort, order, orderBy } = props;
  const cellAllign = column.align ? column.align : "left";
  const [bodyKey, setBodyKey] = React.useState(Math.random());

  let useStyles1 = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }));

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    onRequestSort(event, property, orderBy);
  };

  return (
    <React.Fragment>
      <TableCell
        key={column.dataKey}
        align={cellAllign}
        //padding={column.disablePadding ? "none" : "default"}
        sortDirection={orderBy === column.dataKey ? order : false}
      >
        <TableSortLabel
          key={Math.random()}
          active={orderBy === column.dataKey}
          direction={orderBy === column.dataKey ? order : "asc"}
          onClick={createSortHandler(column.dataKey)}
        >
          {column.label}
          {orderBy === column.dataKey ? (
            <span
              style={{
                border: 0,
                clip: "rect(0 0 0 0)",
                height: 1,
                margin: -1,
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                top: 20,
                width: 1,
              }}
            >
              {" "}
              {order === "desc" ? "sorted descending" : "sorted ascending"}{" "}
            </span>
          ) : null}
        </TableSortLabel>
      </TableCell>
    </React.Fragment>
  );
}

// <TableCell align={cellAllign}>{column.label}</TableCell>
