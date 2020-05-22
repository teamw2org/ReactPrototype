import React, { useCallback, useEffect } from "react";
import "./FlatPlanning.style.css";
import "m-react-splitters/lib/splitters.css";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import ItemTypes from "../TreeGrid/ItemTypes";
import Page from "../pages/FlatPlanner.component";
import DragAndDrop from "../utils/DragAndDrop";

export default function BoxTarget() {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <DragAndDrop>
      <div id="content" ref={drop}>
        <Page />
      </div>
    </DragAndDrop>
  );
}
