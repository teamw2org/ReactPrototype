import React from "react";

export default function Select() {
  return (
    <select id="languages">
      <option className="selectOption" value="English">
        English
      </option>
      <option className="selectOption" value="German">
        German
      </option>
      <option className="selectOption" value="French">
        French
      </option>
      <option className="selectOption" value="Japanese">
        Japanese
      </option>
    </select>
  );
}
