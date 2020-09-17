import * as ActionsTypes from "../actions/actionsTypes";
const initialState = {
  orderForm: {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    addressLine1: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address Line one"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "city"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    postCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Postcode"
      },
      value: "",
      validation: {
        required: true,
        minLength: 7,
        maxLength: 7
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Please select", displayValue: "Please select" },
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      validation: {},
      valid: true,
      value: ""
    }
  },
  isFormValid: false,
  order: { orderData: null, ingredients: null, price: 0 },
  isLoading: false,
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.ORDER_SUBMIT_STARTED:
      return {
        ...state,
        order: {
            ...state.order,
            ...action.payLoad.order
          },
        isLoading: action.payLoad.isLoading
      };
    case ActionsTypes.ORDER_SUBMIT_COMPLETE:
      return {
        ...state,
        isLoading: action.payLoad.isLoading
      };
    case ActionsTypes.ORDER_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: action.payLoad.isLoading
      };
      case ActionsTypes.ORDERS_FETCH_STARTED:
        return {
          ...state,
          isLoading: action.payLoad.isLoading
        };
      case ActionsTypes.ORDERS_FETCH_COMPLETE:
        return {
          ...state,
          orders: [...action.payLoad.orders],
          isLoading: action.payLoad.isLoading
        };
      case ActionsTypes.ORDERS_FETCH_FAILED:
        return {
          ...state,
          isLoading: action.payLoad.isLoading
        };
    case ActionsTypes.CONTACT_FORM_INPUT_CHANGED:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          ...action.payLoad.orderForm,
        },
        isFormValid: action.payLoad.isFormValid
      };
    default:
      return state;
  }
};

export default orderReducer;
