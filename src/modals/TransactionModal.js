import classes from "./TransactionModal.module.scss";
import { Fragment, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import toastr from "toastr";
import { getBaseUrl } from "../api";

const TransactionModal = (props) => {
  const baseUrl = getBaseUrl();
  const username = localStorage.getItem("username");
  const stockRef = useRef();
  const amountRef = useRef();
  const priceRef = useRef();
  const width = window.innerWidth;
  const heigth = window.innerHeight;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: width / 3,
    y: (heigth * 2) / 10,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const buyHandler = () => {
    const stock = stockRef.current.value;
    const amount = parseFloat(amountRef.current.value);
    const price = parseFloat(priceRef.current.value);

    fetch(`${baseUrl}/addTransaction`, {
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

    fetch(`${baseUrl}/addTransaction`, {
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
      <div
        className={classes.modal}
        style={{
          left: position.x,
          top: position.y,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className={classes.modalHeader}>
          <span className={classes.modalHeaderText}>Add Transaction</span>
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

export default TransactionModal;
