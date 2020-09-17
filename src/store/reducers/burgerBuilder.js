
import * as ActionTypes from "../actions/actionsTypes";

const initialState ={
    ingredients: null,
    totalPrice: 5,
    error: false,
    isBuilding: false
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ...action.payLoad,
                isBuilding: false
            };
        case ActionTypes.UPDATE_INGREDIENT:
            return {
                ...state,
                ...action.payLoad,
                isBuilding: true
            };
        case ActionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                ...action.payLoad,
                isBuilding: false
            }
        default:
            return state;
    }

}

export default burgerReducer;