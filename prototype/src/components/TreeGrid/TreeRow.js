import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

export default function TreeRow(props) {
  const { row, columns, onExpand, depth, moveCard, id, index } = props;
  const [open, setOpen] = React.useState(row.expanded);
  const [columnsState, setColumnsState] = React.useState();
  const [bodyKey, setBodyKey] = React.useState(Math.random());
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  const classes = useRowStyles();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {},
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action

      const didDrop = monitor.didDrop();
      if (didDrop) {
        moveCard(dragIndex, hoverIndex);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      item.row = row;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: id, row: row, index } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (didDrop) {
        moveCard(id, row, index);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

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
            <KeyboardArrowDownIcon style={{ color: "00676C" }} />
          ) : (
            <KeyboardArrowRightIcon style={{ color: "00676C" }} />
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
    <>
      <TableRow key={bodyKey} ref={ref}>
        {columnsState}
      </TableRow>
    </>
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
