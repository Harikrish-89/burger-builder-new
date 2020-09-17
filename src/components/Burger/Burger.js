import React from "react";
import "./Burger.scss";
import BurgerIngredient from "./Burgeringredient/Burgeringredient";
const burger = props => {
  let transIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, ele) => {
      return arr.concat(ele);
    }, []);
  if (transIngredients.length === 0) {
    transIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
