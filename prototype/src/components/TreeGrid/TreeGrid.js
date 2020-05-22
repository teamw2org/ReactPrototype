import React, { useEffect, useRef, useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DragAndDrop from "../utils/DragAndDrop";
import TreeRow from "./TreeRow";
import TreeCell from "./TreeCell";
import "./TreeGrid.style.css";

export default function TreeGrid(props) {
  const [rowsState, setRows] = React.useState([]);
  const [columnssState, setColumns] = React.useState([]);
  const [bodyKey, setBodyKey] = React.useState(Math.random());

  const { rows, columns, onExpand, onSort, onSortRows } = props;
  const [orders, setOrder] = React.useState({
    order: "asc",
    orderBy: "calories",
  });
  // const [orderBy, setOrderBy] = React.useState("calories");

  const refValue = useRef(orders);
  useEffect(() => {
    refValue.current = orders;
  });

  const refRowsState = useRef(rows);
  useEffect(() => {
    refRowsState.current = rows;
  });

  const handleRequestSort = React.useCallback((event, property) => {
    let orders = refValue.current;
    const isAsc = orders.orderBy === property && orders.order === "asc";
    setOrder({ order: isAsc ? "desc" : "asc", orderBy: property });
    onSort();
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
  let rowId = 0;
  const createRowElements = (rowElementsList, elementsRows, depth) => {
    for (const element of elementsRows) {
      rowElementsList.push(
        <TreeRow
          key={element.identifier}
          depth={depth}
          columns={columns}
          onExpand={(e) => {
            thisExpandedEvent(e);
          }}
          id={rowId + 1}
          index={rowId}
          moveCard={moveCard}
          row={element}
        />
      );
      rowId += 1;
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

  const findRowArray = (id, array) => {
    let resultArray = [];
    for (const element of array) {
      if (id === element.identifier) {
        return array;
      } else {
        const arrayTMP = findRowArray(id, element.children);
        if (arrayTMP.length !== 0) {
          resultArray = arrayTMP;
        }
      }
    }
    return resultArray;
  };

  const moveCard = useCallback(
    (dragId, rowToMoveDown, movedRow, hoverIndex) => {
      let ss = [...refRowsState.current];
      let pizda = [];
      let draggedArray = findRowArray(movedRow.identifier, ss);
      let row;
      if (draggedArray.includes(rowToMoveDown)) {
        const index = draggedArray.indexOf(movedRow);
        const newIndex = draggedArray.indexOf(rowToMoveDown);
        draggedArray.splice(index, 1);
        draggedArray.splice(newIndex, 0, movedRow);
      }

      onSortRows(ss);
    },
    [rowsState]
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>{columnssState}</TableRow>
        </TableHead>
        <DragAndDrop>
          <TableBody>{rowsState}</TableBody>
        </DragAndDrop>
      </Table>
    </TableContainer>
  );
}
