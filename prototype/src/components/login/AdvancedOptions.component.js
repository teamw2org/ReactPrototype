import React from "react";

export default function AdvancedOptions() {
  return (
    <React.Fragment>
      <label htmlFor="project" id="projectLabel">
        Project
      </label>
      <input
        type="text"
        id="project"
        placeholder="Please provide your project"
      />
      <label htmlFor="context" id="contextLabel">
        Context
      </label>
      <input
        type="text"
        id="context"
        placeholder="Please provide the context"
      />
      <label htmlFor="trace" id="traceLabel" style={{ display: "block" }}>
        Trace
      </label>
      <input type="checkbox" id="trace" />
    </React.Fragment>
  );
}
