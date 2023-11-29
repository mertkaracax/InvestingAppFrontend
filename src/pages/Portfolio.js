import React, { useEffect, useState } from "react";
import classes from "./Portfolio.module.scss";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Puff } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import { base_url } from "../api";

const Portfolio = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`${base_url}/users/${username}/get_portfolio`)
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
              <td>AVERAGE COST</td>
              <td>PRICE</td>
              <td>QUANTITY</td>
              <td>CURRENT VALUE</td>
              <td>GAIN / LOSS</td>
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
                  <tr key={item.asset_name}>
                    <td style={{borderLeft: item.recommendation == "BUY" ? "5px solid green" : item.recommendation == "SELL" ? "5px solid red" : "5px solid white"}}>{item.asset_name}</td>
                    <td>{item.average_cost.toFixed(2)} TL</td>
                    <td>{item.close.toFixed(2)} <span className={classes.percantage} style={{color: item.daily_change_rate > 0 ? "rgb(71, 230, 78)" : "rgb(230, 88, 71)"}}>%{item.daily_change_rate.toFixed(2)}</span></td>
                    <td>{item.quantity}</td>
                    <td>{item.total_value.toFixed(0)} TL <span className={classes.percantage} style={{color: item.pnl_percantage > 0 ? "rgb(71, 230, 78)" : "rgb(230, 88, 71)"}}>{item.pnl_percantage.toFixed(2)}%</span></td>
                    <td style={{ color: item.pnl > 0 ? "#47E64E" : "#E65847" }}>
                      {item.pnl.toFixed(2)} TL
                    </td>
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
