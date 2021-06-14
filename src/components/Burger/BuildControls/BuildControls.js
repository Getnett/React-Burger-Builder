import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            addIngrident={() => props.addIngrident(ctrl.type)}
            removeIngrident={() => props.removeIngrident(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        onClick={props.order}
        disabled={!props.purchasble}
        className={classes.OrderButton}
      >
        {props.isAuth ? "ORDER BUTTON" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
