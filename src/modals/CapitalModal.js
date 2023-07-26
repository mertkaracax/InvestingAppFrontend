import classes from "./CapitalModal.module.scss";
import { Fragment, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import toastr from "toastr";

const CapitalModal = (props) => {
  const username = localStorage.getItem("username");
  const stockRef = useRef();
  const amountRef = useRef();
  const priceRef = useRef();

  const buyHandler = () => {
    const stock = stockRef.current.value;
    const amount = parseFloat(amountRef.current.value);
    const price = parseFloat(priceRef.current.value);

    fetch(`http://127.0.0.1:8000/addTransaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        type: "BUY",
        stockName: stock,
        amount: amount,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          props.onClose();
          props.onListen();
          toastr.success("Your transaction is saved successfully", "Success");
        } else {
          toastr.error("Some fields are wrong", "Error");
        }
      })
      .catch((e) => {
        toastr.error(e, "Error");
      });
  };

  const sellHandler = () => {
    const stock = stockRef.current.value;
    const amount = parseFloat(amountRef.current.value);
    const price = parseFloat(priceRef.current.value);

    fetch(`http://127.0.0.1:8000/addTransaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        type: "SELL",
        stockName: stock,
        amount: amount,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          props.onClose();
          props.onListen();
          toastr.success("Your transaction is saved successfully", "Success");
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
          <span className={classes.modalHeaderText}>{props.title}</span>
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
              ref={stockRef}
              className={classes.inp}
              placeholder="stock"
              type="text"
            />
            <input
              ref={amountRef}
              className={classes.inp}
              placeholder="amount"
              type="text"
            />
            <input
              ref={priceRef}
              className={classes.inp}
              placeholder="price"
              type="text"
            />
          </div>
          <div className={classes.btnContainer}>
            <button onClick={buyHandler} className={classes.btnBuy}>
              BUY
            </button>
            <button onClick={sellHandler} className={classes.btnSell}>
              SELL
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CapitalModal;
