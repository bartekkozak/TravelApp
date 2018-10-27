import React from "react";
import Navigation from "../Navigation/Navigation";

const Layout = props => {
  return (
    <div>
      <Navigation />
      {props.children}
    </div>
  );
};

export default Layout;
