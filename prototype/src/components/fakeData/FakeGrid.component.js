import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import ReorderIcon from "@material-ui/icons/Reorder";
import FakeGallery from "./FakeGallery.component";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function createData(id, name, lastname, username, retweet, likes) {
  return { id, name, lastname, username, retweet, likes };
}

const rows = prepareData();

function prepareData() {
  let preparedData = [];
  var data = require("../../fakeData/fake10000.json");
  let i = 0;
  for (const element of data.data) {
    i += 1;
    preparedData.push(
      createData(
        i,
        element.user.firstname + i,
        element.user.lastname,
        element.user.username,
        element.retweet,
        element.likes
      )
    );
  }
  return preparedData;
}

export default function DocumentsGrid() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div style={{ height: "100%" }}>
      <IconButton onClick={setViewMode.bind(null, "grid")}>
        <ReorderIcon />
      </IconButton>
      <IconButton onClick={setViewMode.bind(null, "gallery")}>
        <AppsIcon />
      </IconButton>
      {viewMode === "grid" ? (
        <Paper style={{ height: "100%", width: "100%" }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 500,
                label: "Name",
                dataKey: "name",
              },
              {
                width: 370,
                label: "Lastname",
                dataKey: "lastname",
                numeric: false,
              },
              {
                width: 340,
                label: "Username",
                dataKey: "username",
                numeric: false,
              },
              {
                width: 270,
                label: "Retweet",
                dataKey: "retweet",
                numeric: false,
              },
              {
                width: 320,
                label: "Likes",
                dataKey: "likes",
                numeric: false,
              },
            ]}
          />
        </Paper>
      ) : (
        <FakeGallery />
      )}
    </div>
  );
}
