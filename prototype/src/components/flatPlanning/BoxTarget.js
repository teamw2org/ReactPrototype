import React, { useCallback, useEffect } from "react";
import TreeGrid from "../Task.component";
import "./FlatPlanning.style.css";
import Splitter from "m-react-splitters";
import "m-react-splitters/lib/splitters.css";
import TableHead from "@material-ui/core/TableHead";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { useDrop } from "react-dnd";
import ItemTypes from "../TreeGrid/ItemTypes";
import Page from "../pages/FlatPlanner.component";

export default function BoxTarget() {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <DndProvider backend={Backend}>
      <div id="content" ref={drop}>
        <Page />
      </div>
    </DndProvider>
  );
}
