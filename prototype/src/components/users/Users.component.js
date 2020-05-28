import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { createStore } from "redux";
import { reducerActions } from "../../redux/UserReducer";
import {connect} from "react-redux"
import "./style.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "image", numeric: false, disablePadding: true, label: "Image" },
  { id: "username", numeric: true, disablePadding: false, label: "Username" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "phone", numeric: true, disablePadding: false, label: "Phone" },
  { id: "website", numeric: true, disablePadding: false, label: "Website" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
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

function EnhancedTable(props) {
  const classes = useStyles();
  //const [order, setOrder] = React.useState("asc");
  //const [orderBy, setOrderBy] = React.useState("username");
  //const [selected, setSelected] = React.useState([]);
  //const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //let [usersState, setUsersState] = React.useState([]);


  // changeOrder: order => dispatch({ type: reducerActions.CHANGE_ORDER, order: order }),
  //     changeRowsPerPage: rowsPerPage => dispatch({ type: reducerActions.CHANGE_ROWS_PER_PAGE, rowsPerPage: rowsPerPage }),
  //     changeSelected: selected => dispatch({ type: reducerActions.CHANGE_SELECTED, selected: selected }),
  //     changeUsersState: usersState => dispatch({ type: reducerActions.CHANGE_USERS_STATE, usersState: usersState }),


  const state = props.state;
  const page = state.page;
  const handleRequestSort = (event, property) => {
    const isAsc = state.orderBy === property && state.order === "asc";
    props.changeOrder(isAsc ? "desc" : "asc");
    props.changeOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = state.usersState.map((n) => n.name);
      props.changeSelected(newSelecteds);
      return;
    }
    props.changeSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.selected.slice(1));
    } else if (selectedIndex === state.selected.length - 1) {
      newSelected = newSelected.concat(state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          state.selected.slice(0, selectedIndex),
          state.selected.slice(selectedIndex + 1)
      );
    }

    props.changeSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.changePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.changeRowsPerPage(parseInt(event.target.value, 10));
    //store.dispatch({ type: reducerActions.CHANGE_PAGE, page: 0 });
    props.changePage(0);
  };

  const isSelected = (name) => state.selected.indexOf(name) !== -1;

  const emptyRows =
      state.rowsPerPage -
    Math.min(
        state.rowsPerPage,
      state.usersState.length - state.page * state.rowsPerPage
    );

  function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((responseJson) => {
        let i = 1;
        for (const element of responseJson) {
          i += 15;
          element.image = `https://i.picsum.photos/id/${i}/100/100.jpg`;
        }
        setDataState(responseJson);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }

  useEffect(() => {
    if(state.usersState.length === 0) {
      fetchData();
    }
  }, []);

  function setDataState(responseJson) {
    props.changeUsersState(responseJson);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={state.selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={state.selected.length}
              order={state.order}
              orderBy={state.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={state.usersState.length}
            />
            <TableBody>
              {stableSort(state.usersState, getComparator(state.order, state.orderBy))
                .slice(
                    state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {
                          <div>
                            <img src={row.image} alt={""} />
                          </div>
                        }
                      </TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.website}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={state.usersState.length}
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  state : state
})

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch({ type: reducerActions.CHANGE_PAGE, page: page }),
  changeOrderBy: orderBy => dispatch({ type: reducerActions.CHANGE_ORDER_BY, orderBy: orderBy }),
  changeOrder: order => dispatch({ type: reducerActions.CHANGE_ORDER, order: order }),
  changeRowsPerPage: rowsPerPage => dispatch({ type: reducerActions.CHANGE_ROWS_PER_PAGE, rowsPerPage: rowsPerPage }),
  changeSelected: selected => dispatch({ type: reducerActions.CHANGE_SELECTED, selected: selected }),
  changeUsersState: usersState => dispatch({ type: reducerActions.CHANGE_USERS_STATE, usersState: usersState }),
})

export default connect(mapStateToProps, mapDispatchToProps) (EnhancedTable)
