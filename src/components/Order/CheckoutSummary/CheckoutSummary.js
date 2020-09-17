import React from "react";
import Burger from "../../Burger/Burger";
import Button from "@material-ui/core/Button";
import "./CheckoutSummary.scss"

const checkoutSummary = props => {
  return (
    <div className = "CheckoutSummary">
      <h1> Hope its yummy !!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button onClick={props.onContinue} color="primary">
          Continue
        </Button>
        <Button onClick={props.onCancel} color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
