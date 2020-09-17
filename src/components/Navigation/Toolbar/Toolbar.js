import React from "react";
import Logo from "../../UI/Logo/Logo";
import "./Toolbar.scss";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "./Menu/Menu";

const toolbar = props => (
  <header className="Toolbar">
    <Menu onMenuClicked = {props.onMenuClicked}/>
    <div className="ToolbarLogo DesktopOnly">
      <Logo />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems isLoggedIn={props.isLoggedIn}/>
    </nav>
  </header>
);

export default toolbar;
