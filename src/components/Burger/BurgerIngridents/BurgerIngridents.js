import React from "react";
import classes from "./BurgerIngridents.css";
import { PropTypes } from "prop-types";

const ingridents = (props) => {
  let ingrident = null;
  switch (props.type) {
    case "bread-top":
      ingrident = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "bread-bottom":
      ingrident = <div className={classes.BreadBottom}></div>;
      break;
    case "meat":
      ingrident = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      ingrident = <div className={classes.Cheese}></div>;
      break;
    case "salad":
      ingrident = <div className={classes.Salad}></div>;
      break;
    case "bacon":
      ingrident = <div className={classes.Bacon}></div>;
      break;
    default:
      ingrident = null;
      break;
  }
  return ingrident;
};

ingridents.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ingridents;
