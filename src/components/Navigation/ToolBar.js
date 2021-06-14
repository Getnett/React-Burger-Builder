import React from "react";

import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import classes from "./Toolbar.css";

const toolbrar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle toggle={props.drawerToggle} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbrar;
