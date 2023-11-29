import classes from "./CapitalModal.module.scss";
import { Fragment, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import toastr from "toastr";
import { base_url } from "../api";

const CapitalModal = (props) => {
  const username = localStorage.getItem("username");
  const amountRef = useRef();

  const submitHandler = () => {
    const amount = parseFloat(amountRef.current.value);

    fetch(`${base_url}/users/${username}/increment_capital`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          props.onClose();
          toastr.success("Your capital is updated successfully", "Success");
        } else {
          toastr.error("Some fields are wrong", "Error");
        }
      })
      .catch((e) => {
        toastr.error(e, "Error");
      });
  };

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={classes.modal}>
        <div className={classes.modalHeader}>
          <span className={classes.modalHeaderText}>Add Capital</span>
          <FaTimes
            onClick={props.onClose}
            color="#9F9F9F"
            className={classes.modalHeaderButton}
            size={25}
          />
        </div>
        <div className={classes.modalContent}>
          <div className={classes.inputContainer}>
            <input
              ref={amountRef}
              className={classes.inp}
              placeholder="amount"
              type="text"
            />
          </div>
          <div className={classes.btnContainer}>
            <button onClick={submitHandler} className={classes.btnBuy}>
              Add
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CapitalModal;
