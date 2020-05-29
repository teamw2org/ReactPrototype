/* React */
import React, { useState } from "react";
import ReactDom from "react-dom";
/* Muuri-react */
import { MuuriComponent, useGrid } from "muuri-react";
/* Utils & components */
import {
  boardOptions,
  columnOptions,
  getRandomWord,
  useSend,
} from "../utils/Utils";
import "./style.css";
import DragAndDrop from "../utils/DragAndDrop";
import ItemTypes from "../customTreeGrid/ItemTypes";
import { useDrop } from "react-dnd";

// Column component.
export const Column = ({ children, actionClass, title }) => (
  <div className={"board-column " + actionClass}>
    <div className="board-column-header">{title}</div>
    {children}
  </div>
);

// Demo component.
export const Demo = ({ children }) => (
  <section className="grid-demo">{children}</section>
);

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Kanban Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Drag the items to another list</h4>
      </div>
    </h4>
  </React.Fragment>
);

const VirtualGridElement = (props) => {
  const { width, height, title, viewType } = props;

  const [items, setItems] = useState({
    todo: ["4 - " + Date.now(), "6 - " + Date.now()],
  });

  // UseSend is used when a item changes grid
  // to sync the items state.
  const onSend = useSend(setItems);

  // Children.
  const children = {
    todo: items.todo.map((id) => (
      <Item id={id} key={id} style={{ width: "100%" }} />
    )),
  };

  // Children.
  const childrenImage = {
    todo: [
      <img
        src={`https://i.picsum.photos/id/237/198/300.jpg`}
        style={{ width: "100%", height: "auto" }}
        alt={""}
      />,
    ],
  };
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => addElement(item.rowSource),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addElement = (sourceRow) => {
    let newItems = { ...items };
    newItems.todo.push(sourceRow.label);
    setItems(newItems);
  };

  return { viewType } ? (
    <DragAndDrop>
      <div ref={drop}>
        <Column
          actionClass="todo"
          title="No template assigned"
          style={{ width: "100%" }}
        >
          {/* Column content */}

          <MuuriComponent
            style={{ width: "100%" }}
            id={"TODO"}
            onSend={onSend}
            {...columnOptions}
          >
            {children.todo}
          </MuuriComponent>
        </Column>
      </div>
    </DragAndDrop>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: "url(https://i.picsum.photos/id/237/198/300.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    />
  );
};

// Item component.
// Some memoization to make the app lighter.
const Item = React.memo(({ id }) => {
  // State is manteined when an item change parent.
  const [tag] = useState(getRandomWord());
  // Get the MuuriComponent parent id.
  const gridId = useGrid().id.toLowerCase();

  return (
    <div className="board-item" style={{ width: "100%" }}>
      <div className="board-item-content" id={`${id}-${Date.now()}`}>
        {`${id}`}
        <div className={`tab-item ${gridId}-tab-item`} />
      </div>
    </div>
  );
});

export default VirtualGridElement;
