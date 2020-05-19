import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

export default function TreeRow(props) {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  const { row, columns, onExpand, depth } = props;
  const [open, setOpen] = React.useState(row.expanded);
  const [columnsState, setColumnsState] = React.useState();
  const [bodyKey, setBodyKey] = React.useState(Math.random());
  const classes = useRowStyles();

  useEffect(() => {
    setColumnsState(createTableCells());
  }, [columns, row.expanded]);

  const createTableCells = () => {
    let firstElement = true;
    let elementsList = [];
    for (const element of columns) {
      if (firstElement) {
        elementsList.push(createFirstColumn(element.dataKey));
        firstElement = false;
      } else {
        elementsList.push(createColumn(element.dataKey));
      }
    }
    return elementsList;
  };

  const createFirstColumn = (name) => {
    return (
      <TableCell
        key={Math.random()}
        style={{
          paddingLeft: depth + "px",
          paddingRight: "0px",
          width: "100px !important",
        }}
        component="th"
        scope="row"
      >
        <IconButton
          key={Math.random()}
          aria-label="expand row"
          size="small"
          onClick={() => {
            setOpen(!row.expanded);
            onExpand({ row: row, isExpanded: !row.expanded });
          }}
        >
          {row.expanded ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
        {row[name]}
      </TableCell>
    );
  };

  const createColumn = (name) => {
    return (
      <TableCell key={Math.random()} align="right" style={{ width: 160 }}>
        {row[name]}
      </TableCell>
    );
  };

  return (
    <React.Fragment>
      <TableRow key={bodyKey}>{columnsState}</TableRow>
    </React.Fragment>
  );
}

// TreeRow.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
