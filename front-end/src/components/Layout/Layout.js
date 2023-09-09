import React from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
