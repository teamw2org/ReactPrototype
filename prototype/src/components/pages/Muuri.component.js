/* React */
import React, { useState } from "react";
/* Muuri-react */
import { MuuriComponent } from "muuri-react";
/* Utils & components */
import {
  useFilter,
  generateItems,
  options,
  getPublicationsList,
} from "../utils/Utils";
import {
  Select,
  Header,
  Footer,
  Button,
  Input,
  Demo,
} from "./Components.component";
/* Style */
import "./style.css";
import LeftPage from "./LeftPage.component";
import RightPage from "./RightPage.component";

// App.
const App = () => {
  // Items state.
  const [items, setItems] = useState(generateItems());

  // Sort state.
  const [sort, setSort] = useState({
    value: "title",
  });

  // Filter state.
  const [filter, setFilter] = useState({
    search: "",
    value: "all",
  });

  // Filter method.
  const filterFunction = useFilter(filter.value, filter.search);

  // Children.
  const children = items.map(({ id, publication, title, width, height }) => (
    <Item
      style={{ height: height, width: width, borderColor: "black" }}
      key={id}
      publication={publication}
      title={title}
      width={width}
      height={height}
      remove={() => setItems(items.filter((item) => item.id !== id))}
    />
  ));

  return (
    <div>
      <div>
        <Input
          onKeyUp={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <Select
          values={getPublicationsList()}
          onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        />
        <Select
          values={["Title", "Publication"]}
          onChange={(e) => setSort({ ...sort, value: e.target.value })}
        />
      </div>
      <div style={{ paddingTop: "45px" }}>
        {/* Content */}
        <MuuriComponent
          {...options}
          propsToData={({ publication, title }) => ({ publication, title })}
          filter={filterFunction}
          sort={sort.value}
        >
          {children}
        </MuuriComponent>
        {/* Footer */}
        <Footer>
          <Button onClick={() => setItems(items.concat(generateItems()))} />
        </Footer>
      </div>
    </div>
  );
};

// Item component.
const Item = ({ color, width, height, title, remove, publication }) => {
  return (
    <div className={`item`} style={{ height: height, width: width }}>
      <div className="item-content">
        <div className="card" style={{ display: "flex" }}>
          <LeftPage width="210px" height="100%" title={title} />
          {width !== "210px" ? (
            <RightPage width="210px" height="100%" title={title} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default App;