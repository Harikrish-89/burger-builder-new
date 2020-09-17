import * as ActionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredientsSynchronous = addedIngredients => {
  return { type: ActionTypes.ADD_INGREDIENT, payLoad: addedIngredients };
};

export const fetchIngredientsFailed = () => {
    return {type: ActionTypes.FETCH_INGREDIENTS_FAILED, payLoad: {error: true}}
}

export const initIngredients = () => {
 return dispatch => {
    axios
    .get("/ingredients.json")
    .then(response => {
      dispatch(addIngredientsSynchronous({ ingredients: response.data, totalPrice:5 }));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });

 };
}

export const updateIngredients = updatedIngredients => {
  return {
    type: ActionTypes.UPDATE_INGREDIENT,
    payLoad: updatedIngredients
  };
};
