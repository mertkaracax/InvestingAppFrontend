import React, { useRef } from "react";
import classes from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

const Signup = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;

    const response = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        surname: surname,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toastr.success("Sign up success", "Success");
      navigate("/");
    }
    console.log(data);
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
            A program provides BIST Data, investment analysis, visualised user
            data
          </p>
          <p className={classes.p}>Mert Karaca</p>
        </div>
        <div className={classes["grid6-right"]}>
          <form className={classes.form} onSubmit={submitHandler}>
            <input
              className={classes.input}
              type="text"
              placeholder="username"
              ref={usernameRef}
            ></input>
            <input
              className={classes.input}
              type="password"
              placeholder="password"
              ref={passwordRef}
            ></input>
            <input
              className={classes.input}
              type="text"
              placeholder="name"
              ref={nameRef}
            ></input>
            <input
              className={classes.input}
              type="text"
              placeholder="surname"
              ref={surnameRef}
            ></input>
            <input
              className={classes.inputBtn}
              type="submit"
              placeholder="SIGN IN"
              value="SIGN UP"
            ></input>
            <span className={classes.span}>
              Already have an account?{" "}
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign in
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
