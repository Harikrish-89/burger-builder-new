import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import "./Layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
const Layout = props =>  {
  const [ showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const onMenuClickedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
    return (
      <Aux>
        <div>
          <Toolbar
            onMenuClicked={onMenuClickedHandler}
            isLoggedIn={props.isLoggedIn}
          ></Toolbar>
        </div>
        <div>
          <SideDrawer
            show={showSideDrawer}
            backDropClicked={sideDrawerCloseHandler}
            isLoggedIn={props.isLoggedIn}
          />
        </div>

        <main className="Content">{props.children}</main>
      </Aux>
    );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  };
};

export default connect(mapStateToProps, null)(Layout);
