import React from "react";
import NavigationItem from "./NavigationItem/NaviagionItem";
import "./NavigationItems.scss";
import Aux from "../../../hoc/Aux";

const navigationItems = props => {
  let authenticate = (
    <NavigationItem link="/authenticate"> Log in</NavigationItem>
  );
  if (props.isLoggedIn) {
    authenticate = (
      <Aux>
        <NavigationItem link="/orders"> Your orders</NavigationItem>
        <NavigationItem link="/logout"> Log out</NavigationItem>
      </Aux>
    );
  }
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/burgerBuilder"> Burger builder</NavigationItem>

      {authenticate}
    </ul>
  );
};

export default navigationItems;
