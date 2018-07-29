import React from "react";

const Button = props => {
  return (
    <div className={props.className}>
      <button id={props.id} onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
