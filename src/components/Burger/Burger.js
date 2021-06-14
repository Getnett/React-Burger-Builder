import React from "react";
import classes from "./Burger.css";
import BurgerIngridents from "./BurgerIngridents/BurgerIngridents";
const burger = (props) => {
  let transformedIngridents = Object.keys(props.ingridents)
    .map((igKey) => {
      return [...Array(props.ingridents[igKey])].map((_, i) => {
        return <BurgerIngridents key={igKey + i} type={igKey} />;
      });
    })
    .reduce((prev, cur) => {
      return prev.concat(cur);
    }, []);
  console.log(transformedIngridents);
  if (transformedIngridents.length === 0) {
    transformedIngridents = <p>Please start to add ingridents!!!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngridents type="bread-top" />
      {transformedIngridents}
      <BurgerIngridents type="bread-bottom" />
    </div>
  );
};

export default burger;
