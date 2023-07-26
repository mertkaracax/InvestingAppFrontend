import React, { useEffect, useState } from "react";
import classes from "./Transactions.module.scss";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Puff } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import TransactionModal from "../modals/TransactionModal";
import { getBaseUrl } from "../api";

const Transactions = () => {
  const navigate = useNavigate();
  const baseUrl = getBaseUrl();
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [postListener, setPostListener] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/getTransactions/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
        console.log(data.transactions);
        if (data.transactions.length === 0) {
          toastr.warning(
            "You have not any transactions in your portfolio",
            "Warning"
          );
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        toastr.error(e, "Error");
      });
  }, [postListener]);

  toastr.options = {
    closeButton: true,
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

  return (
    <div className={classes.body}>
      <Navbar />
      {modalOpen && (
        <TransactionModal
          onListen={() =>
            setPostListener((prev) => {
              return !prev;
            })
          }
          onClose={() => setModalOpen(false)}
          title="Add Transaction"
        />
      )}
      <div className={classes.grid12}>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className={classes.modalBtn}
        >
          ADD TRANSACTION
        </button>
        <table className={classes.table}>
          <thead>
            <tr>
              <td>TYPE</td>
              <td>STOCK</td>
              <td>QUANTITY</td>
              <td>PRICE</td>
              <td>REALIZED PNL</td>
              <td>DATE</td>
            </tr>
          </thead>
          <tbody
            style={{
              display: transactions && transactions.length === 0 && "flex",
              alignItems: transactions && transactions.length === 0 && "center",
              justifyContent:
                transactions && transactions.length === 0 && "center",
            }}
          >
            {transactions &&
              transactions.length > 0 &&
              transactions.map((item) => {
                let date = new Date(item.date);
                return (
                  <tr key={Math.random()}>
                    <td
                      style={{
                        backgroundColor:
                          item.type === "BUY" ? "#071501aa" : "#150101aa",
                      }}
                    >
                      {item.type}
                    </td>
                    <td>{item.stockName}</td>
                    <td>{item.amount}</td>
                    <td>{item.price} TL</td>
                    <td
                      style={{
                        color:
                          item.realized && item.realized > 0
                            ? "#47E64E"
                            : item.realized
                            ? "#E65847"
                            : "gray",
                      }}
                    >
                      {item.realized ? `${item.realized} TL` : "-"}
                    </td>
                    <td>
                      {date.toLocaleTimeString().slice(0, -3)} -{" "}
                      {date.toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            {transactions && transactions.length === 0 && loading && (
              <Puff
                height="40"
                width="40"
                radius={1}
                color="#b5964d"
                ariaLabel="puff-loading"
                wrapperClass=""
                visible={true}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
