import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

const Orders = (props) => {
  useEffect(() => {
    props.ordersFetch(props.token, props.userId);
  }, []);

  let orders = <Spinner />;
  if (!props.isLoading) {
    orders = props.orders.map((fetchedOrder) => (
      <Order
        key={fetchedOrder.id}
        ingredients={fetchedOrder.ingredients}
        price={+fetchedOrder.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ordersFetch: (token, userId) => {
      dispatch(actions.ordersFetch(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
