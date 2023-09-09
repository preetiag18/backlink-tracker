import React, { useState } from "react";

const Nav = () => {
  const [responsive, setResponsive] = useState(false);
  const onHeaderClick = () => {
    setResponsive(!responsive);
  };
  return <nav>Home</nav>;
};

export default Nav;
