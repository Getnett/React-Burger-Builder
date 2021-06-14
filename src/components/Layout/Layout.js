import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/ToolBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    openSideDrawer: false,
  };
  closeSideDrawerHandler = () => {
    this.setState({ openSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({
      openSideDrawer: !prevState.openSideDrawer,
    }));
  };
  render() {
    return (
      <Aux>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.openSideDrawer}
          closeSideDrawer={this.closeSideDrawerHandler}
        />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggle={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
