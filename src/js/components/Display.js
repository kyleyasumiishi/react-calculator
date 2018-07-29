import React from "react";

const Display = props => {
  return (
    <div className={props.className}>
      <p id={props.id}>{props.display}</p>
    </div>
  );
};

export default Display;
