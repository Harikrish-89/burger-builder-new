import React from "react";
import { Button } from "@material-ui/core";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import "./ContactData.scss";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
const ContactData = (props) => {
  const orderHandler = (event) => {
    event.preventDefault();
    props.orderSubmit(
      props.orderForm,
      props.history,
      props.ingredients,
      props.totalPrice,
      props.token,
      props.userId
    );
  };

  const inputChangedHandler = (event, elementId) => {
    props.inputChanged(event.target.value, props.orderForm, elementId);
  };

  const formElements = [];
  for (let key in props.orderForm) {
    formElements.push({ id: key, config: props.orderForm[key] });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElements.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.value}
          onChanged={(event) => inputChangedHandler(event, formElement.id)}
          inValid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
        />
      ))}
      <Button color="primary" type="submit" disabled={!props.isFormValid}>
        Order
      </Button>
    </form>
  );
  if (props.isLoading) {
    form = <Spinner />;
  }
  return (
    <div className="ContactData">
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    orderForm: state.order.orderForm,
    isFormValid: state.order.isFormValid,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderSubmit: (orderForm, history, ingredients, price, token, userId) =>
      dispatch(
        orderActions.orderSubmit(
          orderForm,
          history,
          ingredients,
          price,
          token,
          userId
        )
      ),
    inputChanged: (value, form, elementId) =>
      dispatch(orderActions.inputChanged(value, form, elementId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
