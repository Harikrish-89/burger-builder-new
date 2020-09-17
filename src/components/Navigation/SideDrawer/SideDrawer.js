import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "@material-ui/core/Backdrop";
import Aux from "../../../hoc/Aux";
import "./SideDrawer.scss";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 12,
    color: "#fff"
  }
}));

const SideDrawer = props => {
  const classes = useStyles();
  let attachedClasses = ["SideDrawer", "Close"];
  if (props.show) {
    attachedClasses = ["SideDrawer", "Open"];
  }
  return (
    <Aux>
      <Backdrop
        open={props.show}
        onClick={props.backDropClicked}
        className={classes.backdrop}
      />
      <div className={attachedClasses.join(" ")} onClick={props.backDropClicked}>
        <div className="LogoSideDrawer">
          <Logo />
        </div>
        <nav>
          <NavigationItems isLoggedIn={props.isLoggedIn} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
