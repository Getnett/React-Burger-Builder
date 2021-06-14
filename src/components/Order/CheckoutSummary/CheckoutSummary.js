import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const chekoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingridents={props.ingridents} />
      </div>
      <Button btnType="Danger" clicked={props.cancelledChekout}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.contiunedCheckout}>
        CONTINUE
      </Button>
    </div>
  );
};

export default chekoutSummary;
