import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/Contactdata";
import { connect } from "react-redux";

const Checkout = (props) => {
  const onContinue = () => {
    props.history.replace("/checkout/contact-data");
  };

  const onCancel = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    summary = (
      <CheckoutSummary
        ingredients={props.ingredients}
        onCancel={onCancel}
        onContinue={onContinue}
      />
    );
  }
  return (
    <div>
      {summary}
      <Route
        path={props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
  };
};

export default connect(mapStateToProps, null)(Checkout);
