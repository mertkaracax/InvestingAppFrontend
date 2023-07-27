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

  const toggleTransactionFormHandler = () => {
    dispatch(uiActions.toggleTransactionForm());
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
          "Stocks",
          "Transactions",
          "Add Transaction",
          "Add Capital",
          "Sign out",
        ].map((val, index) => (
          <li
            onClick={() => {
              index === 0
                ? navigate("/Portfolio")
                : index === 1
                ? navigate("/Transactions")
                : index === 2
                ? toggleTransactionFormHandler()
                : index === 3
                ? toggleCapitalFormHandler()
                : index === 4
                ? navigate("/")
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
