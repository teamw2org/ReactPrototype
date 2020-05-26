// // import React from "react";
// //
// //
// // export default function DocumentsGrid() {
// //     return (
// //         <div style={{width:'200px', height:'200px', backgroundColor:"#0000FF"}}>
// //         </div>);
// // }
//
//
// import React, {useState,useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// //import data from '../fakeData/fake10000.json';
//
// const useRowStyles = makeStyles({
//     root: {
//         '& > *': {
//             borderBottom: 'unset',
//         },
//     },
// });
//
// function createData(firstname: string, lastname: string, username: string, retweet: string, likes: string,) {
//     return {
//         firstname,
//         lastname,
//         username,
//         retweet,
//         likes,
//         history: [
//             { date: '2020-01-05', customerId: '11091700', amount: 3 },
//             { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//         ],
//     };
// }
//
// function Row(props: { row: ReturnType<typeof createData> }) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const classes = useRowStyles();
//
//     return (
//         <React.Fragment>
//             <TableRow className={classes.root}>
//                 <TableCell>
//                     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     {row.firstname}
//                 </TableCell>
//                 <TableCell align="right">{row.lastname}</TableCell>
//                 <TableCell align="right">{row.username}</TableCell>
//                 <TableCell align="right">{row.retweet}</TableCell>
//                 <TableCell align="right">{row.likes}</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box margin={1}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.price * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }
//
//
//
// export default function DocumentsGrid() {
//     let rows = prepareData();
//
//     function prepareData(){
//         let preparedData = [];
//         var data = require('../fakeData/fake10000.json');
//         let i =0;
//         for (const element of data.data) {
//             i+=1;
//             preparedData.push(createData(element.user.firstname + i, element.user.lastname, element.user.username, element.retweet, element.likes,))
//         }
//         return preparedData;
//     }
//
//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="collapsible table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell />
//                         <TableCell>FirstName</TableCell>
//                         <TableCell align="right">Lastname</TableCell>
//                         <TableCell align="right">Username</TableCell>
//                         <TableCell align="right">Text</TableCell>
//                         <TableCell align="right">Retweet</TableCell>
//                         <TableCell align="right">Likes</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <Row key={row.firstname} row={row} />
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

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
import FakeGallery from "./FakeGallery";

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
  var data = require("../fakeData/fake10000.json");
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
                width: 200,
                label: "Name",
                dataKey: "name",
              },
              {
                width: 220,
                label: "Lastname",
                dataKey: "lastname",
                numeric: false,
              },
              {
                width: 220,
                label: "Username",
                dataKey: "username",
                numeric: false,
              },
              {
                width: 220,
                label: "Retweet",
                dataKey: "retweet",
                numeric: false,
              },
              {
                width: 300,
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
