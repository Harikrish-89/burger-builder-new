import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/Buildcontrols/Buildcontrols";
import ModalDialogBox from "../../components/UI/ModalDialogBox/ModalDialogBox";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect, useSelector, useDispatch } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 2,
};
const BurgerBuilder = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const ingredients = useSelector((state) => {
    return state.burger.ingredients;
  });
  const totalPrice = useSelector((state) => state.burger.totalPrice);
  const error = useSelector((state) => state.burger.error);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);

  const onIngredientUpdated = (updatedIngredients) =>
    dispatch(burgerBuilderActions.updateIngredients(updatedIngredients));
  const initIngredients = useCallback(
    () => dispatch(burgerBuilderActions.initIngredients()),
    [dispatch]
  );
  const onSetRedirectPath = (path) =>
    dispatch(burgerBuilderActions.setAuthRedirectPath(path));

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const addIngredientHandler = (type) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = ++updatedIngredients[type];
    const newPrice = INGREDIENT_PRICES[type] + totalPrice;
    onIngredientUpdated({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
  };

  const removeIngredientHandler = (type) => {
    if (ingredients[type] > 0) {
      const updatedIngredients = { ...ingredients };
      updatedIngredients[type] = --updatedIngredients[type];
      const newPrice = totalPrice - INGREDIENT_PRICES[type];
      onIngredientUpdated({
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      });
    }
  };

  const orderNowClickHandler = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      onSetRedirectPath("/checkout");
      props.history.push("/authenticate");
    }
  };

  const onHideHandler = () => {
    setShowModal(false);
  };

  const onContinueHandler = () => {
    setLoading(true);
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ingredients,
  };
  Object.keys(disabledInfo).forEach((disableInfoKey) => {
    disabledInfo[disableInfoKey] = disabledInfo[disableInfoKey] <= 0;
  });
  const ingredientsForModalContent = {
    ...ingredients,
  };

  let orderSummary = null;

  let burger = error ? <p>Burger cannot be loaded</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <div>
          <Burger ingredients={ingredients} />
        </div>
        <div>
          <BuildControls
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            price={totalPrice}
            orderDisabled={totalPrice <= 5}
            orderNowClickHandler={orderNowClickHandler}
            isLoggedIn={props.isLoggedIn}
          />
        </div>
      </Aux>
    );
    orderSummary = (
      <OrderSummary price={totalPrice} ingredients={ingredients} />
    );
  }
  if (loading) {
    orderSummary = <Spinner />;
  }
  return (
    <Aux>
      {burger}
      <div>
        <ModalDialogBox
          show={showModal}
          onHide={onHideHandler}
          onContinue={onContinueHandler}
          title="Your order summary"
        >
          {orderSummary}
        </ModalDialogBox>
      </div>
    </Aux>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientUpdated: (updatedIngredients) =>
      dispatch(burgerBuilderActions.updateIngredients(updatedIngredients)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onSetRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isLoggedIn: state.auth.token !== null,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
