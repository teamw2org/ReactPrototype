import React from "react";
import VirtualDraggableGrid from "react-virtual-draggable-grid";
import "./FlatPlanner.style.css";
import ItemComponent from "./Document.component";

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    const pagesCount = 100;
    const x = 2;
    const y = 50;
    const items = [];

    for (let iY = 0; iY < y; iY += 1) {
      const row = [];
      items.push(row);
      for (let iX = 0; iX < x; iX += 1) {
        let item = {
          fixedWidth: 210 * 2,
          fixedHeight: 297,
          ItemComponent,
          itemProps: {
            styles: {
              width: "210px",
              height: "210px",
            },
            pagesType: 2,
          },
        };
        const newItem = { ...item };
        const increment = iX + iY * x;
        const key = `item-${increment}`;

        newItem.key = key;
        newItem.itemProps = { ...item.itemProps, name: key };
        newItem.fixedWidth = item.fixedWidth;
        newItem.fixedHeight = item.fixedHeight;

        row.push(newItem);
      }
    }

    this.state = { items };
  }

  // optional; RVDG works as a controlled
  // or an uncontrolled component
  getItems = (items) => {
    this.setState({ items });
  };

  render() {
    return (
      <div id="mainContent">
        <VirtualDraggableGrid
          items={this.state.items}
          noDragElements={["button"]}
          gutterX={10}
          gutterY={10}
          scrollBufferX={400}
          scrollBufferY={400}
          getItems={this.getItems}
        />
      </div>
    );
  }
}
