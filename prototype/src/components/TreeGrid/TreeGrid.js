import React, { useEffect, useRef } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TreeRow from "./TreeRow";
import TreeCell from "./TreeCell";

export default function TreeGrid(props) {
  const [rowsState, setRows] = React.useState([]);
  const [columnssState, setColumns] = React.useState([]);
  const [bodyKey, setBodyKey] = React.useState(Math.random());

  const { rows, columns, onExpand } = props;
  const [orders, setOrder] = React.useState({
    order: "asc",
    orderBy: "calories",
  });
  // const [orderBy, setOrderBy] = React.useState("calories");

  const refValue = useRef(orders);
  useEffect(() => {
    refValue.current = orders;
  });

  const handleRequestSort = React.useCallback((event, property) => {
    let orders = refValue.current;
    const isAsc = orders.orderBy === property && orders.order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    const elementsList = [];
    createCellsElements(elementsList, columns, newOrder, property);
    setColumns(elementsList);

    const sortOrder = stableSort(rows, getComparator(newOrder, property));
    generateRows(sortOrder);
    setOrder({ order: isAsc ? "desc" : "asc", orderBy: property });
    setBodyKey(Math.random());
  });

  useEffect(() => {
    let orders = refValue.current;
    const sortOrder = stableSort(
      rows,
      getComparator(orders.order, orders.orderBy)
    );
    generateRows(sortOrder);
  }, [rows]);

  useEffect(() => {
    const elementsList = [];
    createCellsElements(elementsList, columns, orders.order, orders.orderBy);
    setColumns(elementsList);
  }, [columns]);

  const thisExpandedEvent = (e) => {
    if (!e.isExpanded) {
      e.row.expanded = false;
    } else {
      e.row.expanded = true;
    }
    onExpand(e);
    setBodyKey(Math.random());
  };

  const generateRows = (rowsArray) => {
    const elementsList = [];
    createRowElements(elementsList, rowsArray, 0);
    setRows(elementsList);
  };

  const createCellsElements = (
    cellElementsList,
    cellElements,
    newOrder,
    newOrderBy
  ) => {
    for (const element of cellElements) {
      cellElementsList.push(
        <TreeCell
          //key={Math.random()}
          order={newOrder}
          orderBy={newOrderBy}
          onRequestSort={handleRequestSort}
          key={element.name}
          column={element}
        />
      );
    }
    return cellElementsList;
  };

  const createRowElements = (rowElementsList, elementsRows, depth) => {
    for (const element of elementsRows) {
      rowElementsList.push(
        <TreeRow
          key={Math.random()}
          key={element.name}
          depth={depth}
          columns={columns}
          onExpand={(e) => {
            thisExpandedEvent(e);
          }}
          row={element}
        />
      );
      if (element.children && (element.expanded === null || element.expanded)) {
        createRowElements(rowElementsList, element.children, depth + 15);
      }
    }
    return rowElementsList;
  };

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
    if (array) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      let list = stabilizedThis.map((el) => el[0]);
      for (const arrayElement of list) {
        arrayElement.children = stableSort(arrayElement.children, comparator);
      }
      return list;
    }
    return [];
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>{columnssState}</TableRow>
        </TableHead>
        <TableBody key={Math.random()}>{rowsState}</TableBody>
      </Table>
    </TableContainer>
  );
}
