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
    todo: ["4", "6"],
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

  return (
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
      <div className="board-item-content">
        <span>Item </span>
        {`${id} - ${tag}`}
        <div className={`tab-item ${gridId}-tab-item`} />
      </div>
    </div>
  );
});

export default VirtualGridElement;
