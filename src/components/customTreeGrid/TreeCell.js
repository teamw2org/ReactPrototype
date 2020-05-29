import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default function TreeCell(props) {
  const { column, onRequestSort, order, orderBy } = props;
  const cellAllign = column.align ? column.align : "left";

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
