import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, image, username, email, phone, website) {
    return { name, image, username, email, phone, website };
}

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
    return order === 'desc'
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
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'image', numeric: false, disablePadding: true, label: 'Image' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
    { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
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
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
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
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('username');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let [usersState, setUsersState] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = usersState.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, usersState.length - page * rowsPerPage);

    function fetchData(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((responseJson) => {
                    let i = 1;
                    for (const element of responseJson) {
                        i += 15;
                        element.image = `https://i.picsum.photos/id/${i}/100/100.jpg`;
                    }
                setDataState(responseJson);
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    useEffect(() => {
        fetchData();
    }, []);

    function setDataState(responseJson){
        setUsersState(responseJson);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={usersState.length}
                        />
                        <TableBody>
                            {stableSort(usersState, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {<div><img src={row.image}/></div>}
                                            </TableCell>
                                            <TableCell align="right">{row.username}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.website}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={usersState.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
//
//
// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TablePaginationActions from "./MoveHeaderGrid/TablePaginationActions";
// import TableRow from "@material-ui/core/TableRow";
// import TableHead from "@material-ui/core/TableHead";
//
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
//
// import EnhancedTableToolbar from "./MoveHeaderGrid/EnhancedTableToolbar";
// import EnhancedTableHead from "./MoveHeaderGrid/EnhancedTableHead";
// import TablePagination from "@material-ui/core/TablePagination";
//
// let counter = 0;
// // a little function to help us with reordering the result
// // From react-sortable-hoc sample code
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//
//     return result;
// };
//
// const styles = theme => ({
//     root: {
//         // width: "100%",
//         marginTop: theme.spacing.unit * 3
//     },
//     table: {
//         minWidth: 1020
//     },
//     tableWrapper: {
//         overflowX: "auto"
//     }
// });
//
// class EnhancedTable extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         this.fetchData();
//         this.state = {
//             order: "asc",
//             orderBy: "name",
//             selected: [],
//             data: [].sort((a, b) => (a.name < b.name ? -1 : 1)),
//             // id must be lowercase
//             // width must be integer (for pixels)
//             // TODO: rename width -> widthInPixels?
//             // TODO: make columnData a prop
//
//             columnData: [
//                 {
//                     id: "name",
//                     numeric: false,
//                     disablePadding: true,
//                     label: "Name",
//                     width: 500
//                 },
//                 {
//                     id: "image",
//                     numeric: false,
//                     disablePadding: false,
//                     label: "Image",
//                     width: 200
//                 },
//                 {
//                     id: "username",
//                     numeric: false,
//                     disablePadding: false,
//                     label: "Username",
//                     width: 200
//                 },
//                 {
//                     id: "email",
//                     numeric: false,
//                     disablePadding: false,
//                     label: "Email",
//                     width: 200
//                 },
//                 {
//                     id: "phone",
//                     numeric: false,
//                     disablePadding: false,
//                     label: "Phone",
//                     width: 100
//                 },
//                 {
//                     id: "website",
//                     numeric: false,
//                     disablePadding: false,
//                     label: "Website",
//                     width: 100
//                 }
//             ],
//             page: 0,
//             rowsPerPage: 10
//         };
//     }
//
//     fetchData = () =>{
//         let preparedData = [];
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then((responseJson) => {
//                 let i = 1;
//                 for (const element of responseJson) {
//                     i += 15;
//                     element.image = `https://i.picsum.photos/id/${i}/100/100.jpg`;
//                     preparedData.push(element);
//                     this.setState({data : preparedData});
//                 }
//             })
//             .catch(err => console.error(this.props.url, err.toString()))
//     }
//
//     setDataState = (preparedData) => {
//         //this.setState({this.state.data : preparedData});
//     }
//
//     onDragEnd = result => {
//         // dropped outside the list
//         if (!result.destination) {
//             return;
//         }
//
//         const columnData = reorder(
//             this.state.columnData,
//             result.source.index,
//             result.destination.index
//         );
//
//         this.setState({
//             columnData
//         });
//     };
//     // Demo code
//     handleWidthChange = (columnId, width) => {
//         this.setState(state => {
//             const currentColumns = state.columnData;
//             const currentColumnIndex = currentColumns.findIndex(column => {
//                 return column.id === columnId;
//             });
//             const columnToChange = currentColumns[currentColumnIndex];
//             const changedColumn = { ...columnToChange, width };
//             currentColumns.splice(currentColumnIndex, 1, changedColumn);
//             // Return the unchanged columns concatenated with the new column
//             const newState = {
//                 columnData: currentColumns
//             };
//             console.log(newState);
//             return newState;
//         });
//     };
//
//     handleArrayMove = (from, to, oldData) => {
//         // guessing this gets replaced by arrayMove method
//         const newData = [].concat(oldData);
//         from >= to
//             ? newData.splice(to, 0, newData.splice(from, 1)[0])
//             : newData.splice(to - 1, 0, newData.splice(from, 1)[0]);
//
//         return newData;
//     };
//
//     handleReorderColumn = (from, to) => {
//         this.setState(state => {
//             return {
//                 columnData: this.handleArrayMove(from, to, state.columnData),
//                 data: this.handleArrayMove(from, to, state.data)
//             };
//         });
//     };
//
//     // material-ui code
//     handleRequestSort = (event, property) => {
//         const orderBy = property;
//         let order = "desc";
//
//         if (this.state.orderBy === property && this.state.order === "desc") {
//             order = "asc";
//         }
//
//         const data =
//             order === "desc"
//                 ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
//                 : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
//
//         this.setState({ data, order, orderBy });
//     };
//
//     // material-ui code
//     handleSelectAllClick = (event, checked) => {
//         if (checked) {
//             this.setState({ selected: this.state.data.map(n => n.id) });
//             return;
//         }
//         this.setState({ selected: [] });
//     };
//
//     // material-ui code
//     handleClick = (event, id) => {
//         const { selected } = this.state;
//         const selectedIndex = selected.indexOf(id);
//         let newSelected = [];
//
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, id);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1)
//             );
//         }
//
//         this.setState({ selected: newSelected });
//     };
//
//     handleChangePage = (event, page) => {
//         this.setState({ page });
//     };
//
//     handleChangeRowsPerPage = event => {
//         this.setState({ rowsPerPage: event.target.value });
//     };
//
//     isSelected = id => this.state.selected.indexOf(id) !== -1;
//
//     render() {
//         const { classes } = this.props;
//         const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
//         const emptyRows =
//             rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
//
//         return (
//             <Paper className={classes.root}>
//                 <EnhancedTableToolbar title="" numSelected={selected.length} />
//                 {/* TODO: Customize TablePagination per https://material-ui.com/demos/tables/#custom-table-pagination-action */}
//                 <div className={classes.tableWrapper}>
//                     <Table
//                         table-layout="fixed"
//                         className={classes.table}
//                         aria-labelledby="tableTitle"
//                     >
//                         <EnhancedTableHead
//                             handleReorderColumnData={this.onDragEnd}
//                             handleResizeColumn={this.handleWidthChange}
//                             columnData={this.state.columnData}
//                             numSelected={selected.length}
//                             order={order}
//                             orderBy={orderBy}
//                             onSelectAllClick={this.handleSelectAllClick}
//                             onRequestSort={this.handleRequestSort}
//                             rowCount={data.length}
//                         />
//                         <TableBody>
//                             {data
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map(n => {
//                                     const isSelected = this.isSelected(n.id);
//                                     return (
//                                         <TableRow
//                                             hover
//                                             onClick={event => this.handleClick(event, n.id)}
//                                             role="checkbox"
//                                             aria-checked={isSelected}
//                                             tabIndex={-1}
//                                             key={n.id}
//                                             selected={isSelected}
//                                         >
//                                             <td>
//                                                 {/* We need to nest the contenst of this row to parallel the
//                         * use of Droppable in the header and ensure that headers and body line up.*/}
//                                                 <Table style={{ display: "block" }}>
//                                                     <TableBody>
//                                                         <TableRow>
//                                                             <TableCell padding="checkbox">
//                                                                 <Checkbox checked={isSelected} />
//                                                             </TableCell>
//                                                             {this.state.columnData.map(column => {
//                                                                 return column.numeric ? (
//                                                                     <TableCell
//                                                                         key={column.id}
//                                                                         padding="none"
//                                                                         width={`${column.width}px` || "100px"}
//                                                                         // numeric
//                                                                     >
//                                                                         <div
//                                                                             width={`${column.width}px` || "100px"}
//                                                                             style={{
//                                                                                 // paddingRight: "40px",
//                                                                                 whiteSpace: "nowrap",
//                                                                                 overflow: "hidden",
//                                                                                 textOverflow: "ellipsis"
//                                                                             }}
//                                                                         >
//                                                                             {n[column.id]}
//                                                                         </div>
//                                                                     </TableCell>
//                                                                 ) : (
//                                                                     column.id === "image" ? (
//                                                                         <TableCell>
//                                                                             {<div><img src={column.image}/></div>}
//                                                                         </TableCell>) :
//                                                                         (
//                                                                     <TableCell
//                                                                         key={column.id}
//                                                                         padding="none"
//                                                                         width={`${column.width}px` || "100px"}
//                                                                     >
//                                                                         <div
//                                                                             style={{
//                                                                                 width: `${column.width}px` || "100px",
//                                                                                 whiteSpace: "nowrap",
//                                                                                 overflow: "hidden",
//                                                                                 textOverflow: "ellipsis"
//                                                                                 // wordBreak: "break-all",
//                                                                                 // wordWrap: "break-word"
//                                                                             }}
//                                                                         >
//                                                                             {n[column.id]}
//                                                                         </div>
//                                                                     </TableCell>)
//                                                                 );
//                                                             })}
//                                                         </TableRow>
//                                                     </TableBody>
//                                                 </Table>
//                                             </td>
//                                         </TableRow>
//                                     );
//                                 })}
//                             {emptyRows > 0 && (
//                                 <TableRow style={{ height: 49 * emptyRows }}>
//                                     <TableCell colSpan={6} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                         <TableHead>
//                             <TableRow>
//                                 <TablePagination
//                                     component="div"
//                                     count={data.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     backIconButtonProps={{
//                                         "aria-label": "Previous Page"
//                                     }}
//                                     nextIconButtonProps={{
//                                         "aria-label": "Next Page"
//                                     }}
//                                     rowsPerPageOptions={[10, 15, 25, 50]}
//                                     onChangePage={this.handleChangePage}
//                                     onChangeRowsPerPage={this.handleChangeRowsPerPage}
//                                     ActionsComponent={TablePaginationActions}
//                                 />
//                             </TableRow>
//                         </TableHead>
//                     </Table>
//                 </div>
//             </Paper>
//         );
//     }
// }
//
// EnhancedTable.propTypes = {
//     classes: PropTypes.object.isRequired
// };
//
// export default withStyles(styles)(EnhancedTable);
