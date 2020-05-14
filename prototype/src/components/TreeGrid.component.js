import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../index.css";

import React, { lazy, useEffect, useState } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import base64 from "react-native-base64";

const TreeGrid = (props) => {
  const [data, setData] = useState({ nodes: [] });
  const [loading, setLoading] = useState([false]);
  const sizeInPercentage = !props.sizeInPercentage
    ? "50%"
    : props.sizeInPercentage;

  useEffect(() => {
    loadData("", "");
  }, []);

  function loadData(parentEntity, parentIdentifier) {
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
            key: el.identifier,
            data: {
              name: el.label,
              identifier: el.identifier,
              type: el.entityBucketId,
            },
            leaf: false,
          };
        });
        setData({ nodes: dataForTree });
      });
  }

  function onExpand(event) {
    if (!event.node.children) {
      setLoading(true);

      let lazyNode = { ...event.node };

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
          event.node.data.type +
          "&parentIdentifier=" +
          event.node.key,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          const dataForTree = json.map((el) => {
            return {
              key: el.identifier,
              data: {
                name: el.label,
                identifier: el.identifier,
                type: el.entityBucketId,
              },
              leaf: false,
            };
          });

          lazyNode.children = dataForTree;
          let copiedData = [...data.nodes];

          const generateData = (copiedData) => {
            if (copiedData) {
              copiedData.forEach(function (item, i) {
                if (item.key === event.node.key) {
                  copiedData[i] = lazyNode;
                  if (
                    lazyNode.children === null ||
                    lazyNode.children.length === 0
                  ) {
                    lazyNode.leaf = true;
                  }
                } else {
                  generateData(copiedData[i].children);
                }
              });
            }
          };

          generateData(copiedData);

          setData({ nodes: copiedData });
        });
    }
  }

  return (
    <div style={{ height: sizeInPercentage }}>
      <TreeTable
        style={{ height: "100%", padding: "2px 5px 2px 5px" }}
        tableStyle={{ height: "100%" }}
        scrollHeight="400px"
        value={data.nodes}
        reorderableRows={true}
        lazy={true}
        onExpand={onExpand}
        autoLayout={true}
        resizableColumns={true}
        reorderableColumns={true}
        paginator={true}
        alwaysShowPaginator={false}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        scrollable={true}
      >
        <Column
          field="name"
          header="Label"
          expander={true}
          sortable
          reorderable={true}
        ></Column>
        <Column field="identifier" header="Identifier"></Column>
        <Column field="type" header="Type"></Column>
      </TreeTable>
    </div>
  );
};

export default TreeGrid;
