import React from "react";
import "./Buildcontrols.scss";
import BuildControl from "./Buildcontrol/Buildcontrol";
import { Button } from "react-bootstrap";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className="BuildControls">
    <p>
      Your price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disableRemove={props.disabled[ctrl.type]}
      />
    ))}
    <Button
      disabled={props.orderDisabled}
      onClick={props.orderNowClickHandler}
      variant="success"
    >
      {props.isLoggedIn ? "ORDER NOW" : "Sign up to order"}
    </Button>
  </div>
);

export default buildControls;
