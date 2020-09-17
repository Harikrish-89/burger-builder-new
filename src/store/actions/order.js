import * as ActionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const orderSubmit = (orderForm, history, ingredients, price, token, userId) => {
  return dispatch => {
    const formData = {};
    for (let formId in orderForm) {
      formData[formId] = orderForm[formId].value;
    }
    const order = {
      orderData: formData,
      ingredients: ingredients,
      price: price,
      userId: userId
    };
    dispatch(
      dispatchUtility(ActionTypes.ORDER_SUBMIT_STARTED, {
        order: order,
        isLoading: true
      })
    );
    axios
      .post("/orders.json?auth=" + token, order)
      .then(response => {
        history.push("/burgerBuilder");
        dispatch(
          dispatchUtility(ActionTypes.ORDER_SUBMIT_COMPLETE, {
            isLoading: false
          })
        );
      })
      .catch(
        dispatch(
          dispatchUtility(ActionTypes.ORDER_SUBMIT_FAILED, { isLoading: false })
        )
      );
  };
};
const dispatchUtility = (actionType, payLoad) => {
  return {
    type: actionType,
    payLoad: payLoad
  };
};

export const inputChanged = (value, currentForm, elementId) => {
  const updatedOrderForm = {
    ...currentForm
  };
  const updatedElement = { ...updatedOrderForm[elementId] };
  updatedElement.value = value;
  updatedElement.valid = checkValidity(
    updatedElement.value,
    updatedElement.validation
  );
  updatedElement.touched = true;
  updatedOrderForm[elementId] = updatedElement;
  let isFormValid = true;
  for (let id in updatedOrderForm) {
    isFormValid = updatedOrderForm[id].valid && isFormValid;
  }
  return {
    type: ActionTypes.CONTACT_FORM_INPUT_CHANGED,
    payLoad: { orderForm: updatedOrderForm, isFormValid: isFormValid }
  };
};

function checkValidity(value, rules) {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
}

export const ordersFetch = (token,userId) => {
  return dispatch => {
    dispatch(
      dispatchUtility(ActionTypes.ORDERS_FETCH_STARTED, { isLoading: true })
    );
    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        dispatch(
          dispatchUtility(ActionTypes.ORDERS_FETCH_COMPLETE, {
            orders: fetchedOrders,
            isLoading: false
          })
        );
      })
      .catch(error => {
        dispatch(
          dispatchUtility(ActionTypes.ORDERS_FETCH_FAILED, { isLoading: false })
        );
      });
  };
};
