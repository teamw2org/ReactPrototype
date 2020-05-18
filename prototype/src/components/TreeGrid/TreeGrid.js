import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TreeRow from "./TreeRow";
import TreeCell from "./TreeCell";

export default function CollapsibleTable(props) {
  const [rowsState, setRows] = React.useState([]);
  const [columnssState, setColumns] = React.useState([]);
  const { rows, columns, onExpand } = props;

  useEffect(() => {
    generateRows();
  }, [rows]);

  useEffect(() => {
    const elementsList = [];
    createCellsElements(elementsList, columns);
    setColumns(elementsList);
  }, [columns]);

  const expandedEvent = (e) => {
    if (!e.isExpanded) {
      e.row.expanded = false;
    } else {
      e.row.expanded = true;
    }
    generateRows();
  };

  const generateRows = () => {
    const elementsList = [];
    createRowElements(elementsList, rows, 0);
    setRows(elementsList);
  };

  const createCellsElements = (cellElementsList, cellElements) => {
    for (const element of cellElements) {
      cellElementsList.push(<TreeCell key={element.name} column={element} />);
    }
    return cellElementsList;
  };

  const createRowElements = (rowElementsList, elementsRows, depth) => {
    for (const element of elementsRows) {
      rowElementsList.push(
        <TreeRow
          key={element.name}
          depth={depth}
          onExpand={(e) => {
            onExpand(e);
            expandedEvent(e);
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>{columnssState}</TableRow>
        </TableHead>
        <TableBody>{rowsState}</TableBody>
      </Table>
    </TableContainer>
  );
}
