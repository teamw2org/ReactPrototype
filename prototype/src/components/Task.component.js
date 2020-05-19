import React, { useEffect, useState } from "react";
import TreeGrid from "./TreeGrid/TreeGrid";
import base64 from "react-native-base64";

export default function Task() {
  function setChildren(data, row) {
    if (row) {
      let copiedState = [...rowsState];
      row.children = data;
      setRowsState(copiedState);
    } else {
      setRowsState(data);
    }
  }

  const [rowsState, setRowsState] = useState([]);

  useEffect(() => {
    loadData("", "", null);
  }, []);

  const handleExpandChange = (e) => {
    let rowsState1 = [...rowsState];
    if (!e.row.children || e.row.children.length == 0) {
      loadData(e.row.entityBucketId, e.row.identifier, e.row);
    } else {
      setRowsState(rowsState1);
    }
  };

  function loadData(parentEntity, parentIdentifier, row) {
    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode("gnadmin:werk2admin")
    );
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    headers.append("Access-Control-Allow-Headers", "Content-Type, Accept");

    fetch(
      "http://localhost:40080/PlannerRESTService/aio/EN/v1/publications/buckets?sessionid=alamakota&parentEntityIdentifier=" +
        parentEntity +
        "&parentIdentifier=" +
        parentIdentifier,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const dataForTree = json.map((el) => {
          return {
            label: el.label,
            identifier: el.identifier,
            entityBucketId: el.entityBucketId,
            children: [],
          };
        });
        setChildren(dataForTree, row);
      });
  }

  return (
    <TreeGrid
      rows={rowsState}
      columns={[
        {
          width: 200,
          label: "Label",
          dataKey: "label",
          visible: true,
        },
        {
          width: 100,
          label: "Identifier",
          dataKey: "identifier",
          numeric: false,
          visible: true,
          align: "right",
        },
        {
          width: 100,
          label: "Entity Identifier",
          dataKey: "entityBucketId",
          numeric: false,
          visible: true,
          align: "right",
        },
      ]}
      onExpand={handleExpandChange}
    />
  );
}
