import React from "react";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const orderSummary = Object.keys(props.ingridents).map((igKey) => {
    return (
      <li key={igKey}>
        {" "}
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingridents[igKey]}{" "}
      </li>
    );
  });
  return (
    <div>
      <h3>Your order</h3>
      <p>Delcious burger with the following ingridents</p>
      <ul>{orderSummary}</ul>
      <p>
        {" "}
        <strong>TotalPrice:{props.price.toFixed(2)}</strong>{" "}
      </p>
      <p>Continue to check out?</p>
      <Button clicked={props.cancelOrder} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continueOrder} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default orderSummary;
