import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import { Button } from "@material-ui/core";
import "./Auth.scss";
import * as Actions from "../../store/actions";
import { connect } from "react-redux";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
const Auth = (props) => {
  const [signInForm, setSignInForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "User email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 7,
      },
      valid: false,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    if (!props.isBuilding && props.redirectPath !== "/") {
      props.onSetRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, elementId) => {
    event.preventDefault();
    const updatedSignInForm = {
      ...signInForm,
    };
    const updatedElement = { ...updatedSignInForm[elementId] };
    updatedElement.value = event.target.value;
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.touched = true;
    updatedSignInForm[elementId] = updatedElement;
    let isFormValid = true;
    for (let id in updatedSignInForm) {
      isFormValid = updatedSignInForm[id].valid && isFormValid;
    }
    setSignInForm(updatedSignInForm);
    setIsFormValid(isFormValid);
  };

  const checkValidity = (value, rules) => {
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const signUpUser = (event) => {
    event.preventDefault();
    props.onSignUp(signInForm.email.value, signInForm.password.value);
  };

  const switchToSignInHandler = () => {
    setSignIn(!signIn);
  };

  const signInUser = (event) => {
    event.preventDefault();
    props.onSignIn(signInForm.email.value, signInForm.password.value);
  };

  let authRedirect = null;
  if (props.isLoggedIn) {
    authRedirect = <Redirect to={props.redirectPath} />;
  }
  const formElements = [];
  for (let key in signInForm) {
    formElements.push({ id: key, config: signInForm[key] });
  }

  let display = (
    <form onSubmit={signIn ? signInUser : signUpUser} className="SignInForm">
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
      <Button
        color="primary"
        variant="contained"
        type="submit"
        className="textPrimary"
        disabled={!isFormValid}
      >
        {signIn ? "Sign In" : "Sign up"}
      </Button>
      <hr />
      <Button
        color="secondary"
        variant="contained"
        type="button"
        className="textSecondary"
        onClick={switchToSignInHandler}
      >
        {signIn ? "Switch to sign up" : "Switch to sign in"}
      </Button>
    </form>
  );
  if (props.isLoading) {
    display = <Spinner />;
  }
  return (
    <div>
      {authRedirect} {display}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userName, password) => {
      dispatch(Actions.authSignUpAsync(userName, password));
    },
    onSignIn: (userName, password) => {
      dispatch(Actions.authSignInAsync(userName, password));
    },
    onSetRedirectPath: () => {
      dispatch(Actions.setAuthRedirectPath("/"));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.token !== null,
    isBuilding: state.burger.isBuilding,
    redirectPath: state.auth.authRedirectPath,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
