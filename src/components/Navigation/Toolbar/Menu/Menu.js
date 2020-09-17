import React from "react";
import Aux from "../../../../hoc/Aux";
import "./Menu.scss";
import "../Toolbar.scss";
import Logo from "../../../UI/Logo/Logo"

const menu = props => (
  <Aux>
    <div className="DrawerToggle" onClick={props.onMenuClicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
   </Aux>
);

export default menu;
