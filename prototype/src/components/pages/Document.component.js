import React from "react";
import PropTypes from "prop-types";
import LeftPage from "./LeftPage.component";
import RightPage from "./RightPage.component";

const Document = (props) => {
  const { name, styles, pagesType } = props;

  return (
    <div style={{ display: "flex" }}>
      <LeftPage width="210px" height="297px" />
      {pagesType === 2 ? <RightPage width="210px" height="297px" /> : null}
    </div>
  );
};

Document.propTypes = {
  name: PropTypes.string.isRequired,
  styles: PropTypes.object,
};

Document.defaultProps = {
  styles: {},
};
export default Document;
