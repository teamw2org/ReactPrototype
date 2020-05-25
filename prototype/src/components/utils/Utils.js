import React, { useCallback } from "react";
import VirtualGridElement from "../pages/VirtualGridElement.component";
// a little function to help us with reordering the result
export const Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 6;
export const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "right",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

export const getQuestionListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 350,
});

export const getAnswerListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  width: 250,
});

// Return the filter method.
export function useFilter(value, search) {
  return useCallback(
    function (data) {
      var isSearchMatch = !search
        ? true
        : data.title.toLowerCase().indexOf(search) > -1;
      var isFilterMatch =
        value === "all" ? true : data.publication.toLowerCase() === value;
      return isSearchMatch && isFilterMatch;
    },
    [value, search]
  );
}

let uuid = 100;
let publications = [];
// Generate 100 items.
export function generateItems() {
  const items = [];
  let j = 1;
  publications = [];
  publications.push("ALL");
  for (let i = 0; i < 100; i++) {
    let width = 210 * 2;
    if (Math.random() < 0.2) {
      width = 210;
      publications.push("Publication" + j);
      j++;
    }
    items.push(
      generateItem(width, 297, 1, "Publication" + j, "black", i + "_document")
    );
  }

  return items;
}

export function getVirtualGridElement1(possition) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#00cec9",
          position: "absolute",
          width: "80px",
          height: "150px",
          left: possition + 15 + "px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={`https://i.picsum.photos/id/237/198/300.jpg`}
          style={{ width: "100%", height: "auto" }}
          alt={""}
        />
      </div>
      <div
        style={{
          backgroundColor: "lightblue",
          position: "absolute",
          width: "80px",
          height: "150px",
          left: possition + 120 + "px",
        }}
      ></div>
    </>
  );
}

export function getVirtualGridElement3(possition) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#e17055",
          position: "absolute",
          width: "190px",
          height: "180px",
          left: possition + 10 + "px",
        }}
      >
        <VirtualGridElement />
      </div>
    </>
  );
}

export function getVirtualGridElement2(possition) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#fdcb6e",
          position: "absolute",
          width: "80px",
          height: "80px",
          left: possition + 15 + "px",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#a29bfe",
          position: "absolute",
          width: "80px",
          height: "80px",
          left: possition + 120 + "px",
        }}
      ></div>

      <div
        style={{
          backgroundColor: "#74b9ff",
          position: "absolute",
          width: "185px",
          height: "60px",
          left: possition + 15 + "px",
          top: "200px",
        }}
      ></div>
    </>
  );
}

export function getPublicationsList() {
  return publications;
}

// Generate item.
export function generateItem(
  _width,
  _height,
  _scale,
  _publication,
  _color,
  _title
) {
  const publication = _publication;
  const width = Math.floor(_width * _scale) + "px";
  const height = Math.floor(_height * _scale) + "px";

  const color = _color;
  const title = _title;
  const id = uuid++;

  return { id, publication, width, height, color, title };
}

// Grid static options.
export const options = {
  dragSortHeuristics: {
    sortInterval: 70,
  },
  layoutDuration: 400,
  dragRelease: {
    duration: 400,
    easing: "ease-out",
  },
  dragEnabled: true,
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    createElement: function (item) {
      // The element will have the Css class ".muuri-item-placeholder".
      return item.getElement().cloneNode(true);
    },
  },
};

// Return the 'onSend' method.
export function useSend(setItems) {
  return useCallback(({ key, fromId, toId }) => {
    // The id of the MuuriComponent that is sending the item.
    fromId = fromId.toLowerCase();
    // The id of the MuuriComponent that is receiving the item.
    toId = toId.toLowerCase();

    // Sync the state with the items.
    setItems((items) => {
      const newItems = { ...items };
      // Remove the item from the old category.
      newItems[fromId] = newItems[fromId].filter((item) => item !== key);
      // Add the item in the new category.
      newItems[toId] = newItems[toId].concat(key);
      return newItems;
    });
  }, []); // eslint-disable-line
}

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

// Return a random word.
export function getRandomWord() {
  return (
    oneOf("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + oneOf("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  );
}

// Board static options.
export const boardOptions = {
  containerClass: "board",
  layoutDuration: 400,
  dragEnabled: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  // It's possible to drag the column only
  // by clicking on the header.
  dragStartPredicate: {
    handle: ".board-column-header",
  },
};

// Column static options.
export const columnOptions = {
  // Enable to send the items in
  // the grids with the following groupId.
  dragSort: { groupId: "NOTES" },
  groupIds: ["NOTES"],
  containerClass: "board-column-content",
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragContainer: document.body,
};
