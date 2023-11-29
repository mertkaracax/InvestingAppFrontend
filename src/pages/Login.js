import React, { useRef, useState } from "react";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { base_url } from "../api";

const Login = () => {
  const navigate = useNavigate();

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "slideDown",
    hideMethod: "fadeOut",
  };
  const usernameRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch(`${base_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("surname", data.user.surname);
        navigate("Homepage");
      } else {
        toastr.error("Username or password is wrong", "Error");
      }
    } catch (e) {
      toastr.error(e.toString(), "Error");
    }
  }

  return (
    <div className={classes.body}>
      <img
        className={classes.img}
        src={require("../images/backgroundImage.jpg")}
      />
      <div className={classes.grid12}>
        <div className={classes["grid6-left"]}>
          <h4 className={classes.h4}>INVEST TRACKER</h4>
          <p className={classes.p}>
            A program provides BIST Data, visualised investment analysis
          </p>
          <p style={{ marginTop: 40 }} className={classes.p}>
            -Mert Karaca
          </p>
        </div>
        <div className={classes["grid6-right"]}>
          <form className={classes.form} onSubmit={submitHandler}>
            <input
              className={classes.input}
              type="text"
              placeholder="username"
              ref={usernameRef}
              defaultValue=""
            ></input>
            <input
              className={classes.input}
              type="password"
              placeholder="password"
              ref={passwordRef}
              defaultValue=""
            ></input>
            <input
              className={classes.inputBtn}
              type="submit"
              placeholder="SIGN IN"
              value="SIGN IN"
            ></input>
            <span className={classes.span}>
              Don't you have an account?{" "}
              <a
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                Sign up
              </a>
            </span>
            <button className={classes.buttonFacebook}>
              Login with Facebook
            </button>
            <button className={classes.buttonGoogle}>Login with Google</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
