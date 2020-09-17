import React from "react";
import "./NavigationItem.scss";
import { NavLink } from "react-router-dom";

const navigationItem = props => (
  <li className="NavigationItem">
    <NavLink to={props.link} className="nav-link" activeClassName="active">
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
