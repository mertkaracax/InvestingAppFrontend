import React, { useEffect, useState } from "react";
import classes from "./Portfolio.module.scss";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Puff } from "react-loader-spinner";
import Navbar from "../components/Navbar";

const Portfolio = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/getAssets/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setAssets(data.assets);
        console.log(data.assets);
        if (!data.assets || data.assets.length === 0) {
          toastr.info("You have not any stock in your portfolio", "Info");
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        toastr.error(e, "Error");
      });
  }, []);

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
      <div className={classes.grid12}>
        <table className={classes.table}>
          <thead>
            <tr>
              <td>STOCK</td>
              <td>QUANTITY</td>
              <td>AVERAGE COST</td>
              <td>TOTAL VALUE</td>
              <td>GAIN / LOSS</td>
              <td>CLOSE</td>
            </tr>
          </thead>
          <tbody
            style={{
              display: assets && assets.length === 0 && "flex",
              alignItems: assets && assets.length === 0 && "center",
              justifyContent: assets && assets.length === 0 && "center",
            }}
          >
            {assets &&
              assets.length > 0 &&
              assets.map((item) => {
                return (
                  <tr key={item.assetName}>
                    <td>{item.assetName}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.avgBuyPrice.toFixed(2)} TL</td>
                    <td>{item.totalValue.toFixed(0)} TL</td>
                    <td style={{ color: item.pnl > 0 ? "#47E64E" : "#E65847" }}>
                      {item.pnl.toFixed(2)} TL
                    </td>
                    <td>{item.close}</td>
                  </tr>
                );
              })}
            {assets && assets.length === 0 && loading && (
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

export default Portfolio;
