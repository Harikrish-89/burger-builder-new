import React from "react";
import Aux from "../../../hoc/Aux";

const orderSummary = props => (
  <Aux>
    <p>Your price:{props.price}</p>
    <p>Your burger will be delivered with following ingredients</p>
    {Object.keys(props.ingredients).map((value, index) => (
      <p key={index}> {value} : {props.ingredients[value]}</p>
    ))}
  </Aux>
);

export default orderSummary;
