import React from "react";
import styles from "./Dropdown.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { uiActions } from "../store/uiSlice";
import { useDispatch } from "react-redux";

const Dropdown = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const surname = localStorage.getItem("surname");

  const dispatch = useDispatch();
  const toggleCapitalFormHandler = () => {
    dispatch(uiActions.toggleCapitalForm());
  };

  return (
    <div className={styles.nav__menu}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        <FaUserAlt size={25} color="#B5B5B5" />
        <span style={{ marginLeft: 10, color: "#B2B2B2" }}>
          {name} {surname}
        </span>
      </div>
      <ul
        className={`${styles["nav__menu-lists"]} ${styles["nav__menu--1-lists"]}`}
      >
        {[
          "Homepage",
          "Stocks",
          "Transactions",
          "Increase Capital",
          "Sign out",
        ].map((val, index) => (
          <li
            onClick={() => {
              index === 0
                ? navigate("/Homepage")
                : index === 1
                ? navigate("/Portfolio")
                : index === 4
                ? navigate("/")
                : index === 2
                ? navigate("/Transactions")
                : index === 3
                ? toggleCapitalFormHandler()
                : toastr.error("dropdownda sıkıntı var");
            }}
            key={index}
            className={styles["nav__menu-items"]}
          >
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
