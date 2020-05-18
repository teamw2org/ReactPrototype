import React, {useState} from "react";
import TreeGrid from "./TreeGrid/TreeGrid";

export default function Task() {

  function createData(name, calories, fat, carbs, protein, price) {
    const elementsList = [];

    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      children: elementsList
    };
  }

  const [rowsState, setState] = useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
    createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
    createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5)
  ]);

  const handleExpandChange = (e) => {
    if(!e.row.children || e.row.children.length == 0) {
      let rowsState1 = [...rowsState];
      const children = [
        createData("aaaaaa" + Math.random(), 159, 6.0, 24, 4.0, 3.99),
      ];
      e.row.children = children;

      setState(rowsState1);
    }
  }

  return <TreeGrid rows={rowsState}
                   columns={[
                     {
                       width: 200,
                       label: "Dessert (100g serving)",
                       dataKey: "name",
                       visible: true,
                     },
                     {
                       width: 100,
                       label: "Calories",
                       dataKey: "calories",
                       numeric: false,
                       visible: true,
                       align: "right",
                     },
                     {
                       width: 100,
                       label: "Fat (g)",
                       dataKey: "fat",
                       numeric: false,
                       visible: true,
                       align: "right",
                     },
                     {
                       width: 100,
                       label: "Carbs (g)",
                       dataKey: "carbs",
                       numeric: false,
                       visible: true,
                       align: "right",
                     },
                     {
                       width: 100,
                       label: "Protein (g)",
                       dataKey: "protein",
                       numeric: false,
                       visible: true,
                       align: "right",
                     },
                     {
                       width: 100,
                       label: "Price",
                       dataKey: "price",
                       numeric: true,
                       visible: true,
                       align: "right",
                     },
                   ]}
                   onExpand={handleExpandChange}/>;
}