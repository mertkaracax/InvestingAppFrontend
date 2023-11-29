import React, { useState, useEffect } from "react";
import classes from "./HomeCard.module.scss";
import { useNavigate } from "react-router-dom";

const HomeCard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const valueElement = document.getElementById(props.id);
    valueElement.classList.add(classes.value);
    setTimeout(() => {
      valueElement.classList.remove(classes.value);
    }, 200);
  }, [props.value]);

  let value;
  if (props.title === "Realized") {
    value = `${props.value && props.value.toFixed(2)}₺`;
  } else if (props.title === "Portfolio Value") {
    value = `${typeof props.value !== "undefined" ? props.value.toFixed(0) : "- "}` + "₺";
  } else if (props.title === "Total PNL") {
      if (props.value > 0) {
        value =
          `${
            typeof props.value !== "undefined" ? props.value.toFixed(2) : "- "
          }` + "₺";
      } else if (props.value === 0) {
        value =
          `${
            typeof props.value !== "undefined" ? props.value.toFixed(2) : "- "
          }` + "₺";
      } else {
        value =
          `${
            typeof props.value !== "undefined" ? props.value.toFixed(2) : "- "
          }` + "₺";
      }
  } else if (props.title === "Cash Position") {
    value = `${!isNaN(props.value) ? props.value.toFixed(2) : "- "}` + "₺";
  }

  return (
    <div
      onClick={() => {
        navigate("/Portfolio");
      }}
      className={classes["ag-courses-item_link"]}
    >
      <div className={classes["ag-courses-item_bg"]}></div>
      <div className={classes["ag-courses-item_title"]}>
        {props.title} <br />
        <div
          id={props.id}
          style={{ fontSize: 28, color: "white" }}
        >
          {value}
        </div>
        {typeof props.percentage === "number" && !isNaN(props.percentage) && (
          <span
            style={{
              fontSize: 15,
              color:
                props.percentage > 0
                  ? "#32A533"
                  : props.percentage < 0
                  ? "#A53232"
                  : "gray",
            }}
          >
            {props.percentage > 0 ? "+" : ""}
            {props.percentage.toFixed(2)}%
          </span>
        )}
        {!props.percentage && <span></span>}
      </div>
      <div className={classes["ag-courses-item_date-box"]}>
        <span className={classes["ag-courses-item_date"]}>See Details</span>
      </div>
    </div>
  );
};

export default HomeCard;
