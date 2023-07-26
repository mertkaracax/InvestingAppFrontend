import classes from "./Navbar.module.scss";
import { BsPieChart } from "react-icons/bs";
import React from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.nav}>
      <div
        onClick={() => {
          navigate("/Homepage");
        }}
        className={classes.leftContainer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BsPieChart size={40} className={classes.icon} color="#c2c2c290" />
        <span className={classes.mainTitle}>Invest Tracker</span>
      </div>
      <Dropdown />
    </div>
  );
};

export default Navbar;
