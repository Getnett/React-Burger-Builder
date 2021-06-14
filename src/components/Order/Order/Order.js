import React from "react";

import classes from "./Order.css";

const order = (props) => {
  let ingridents = [];
  for (let ingridentName in props.ingridents) {
    ingridents.push({
      name: ingridentName,
      amount: props.ingridents[ingridentName],
    });
  }
  const ingrident = ingridents.map((ingrident) => (
    <span
      style={{
        display: "inline-block",
        margin: "0 5px",
        padding: "5px",
      }}
    >
      {" "}
      {ingrident.name} ({ingrident.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingridents {ingrident} </p>
      <p>
        Price: <strong>{+props.price.toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
};

export default order;
