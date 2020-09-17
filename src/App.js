import React, { useEffect, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const Logout = React.lazy(() => {
  return import("./containers/Auth/Logout/Logout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const App = (props) => {
  useEffect(() => {
    props.onCheckAuthState();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/burgerBuilder" component={BurgerBuilder} />
      <Route path="/authenticate" render={(props) =>   <Auth {...props}/>} />
      <Redirect to="/burgerBuilder" from="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) =>   <Checkout {...props}/>} />
        <Route path="/orders" render={(props) =>   <Orders {...props}/>} />
        <Route path="/logout" render={(props) =>   <Logout {...props}/>} />
        <Route path="/authenticate" render={(props) =>   <Auth {...props}/>} />
        <Route path="/burgerBuilder" component={BurgerBuilder} />
        <Redirect to="/burgerBuilder" from="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Layout><Suspense fallback={<p>...Loading</p>}>{routes}</Suspense></Layout>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
