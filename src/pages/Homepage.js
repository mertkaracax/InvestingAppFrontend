import { useNavigate } from "react-router-dom";
import LineChartContainer from "../charts/LineChartContainer";
import { PieChartContainer } from "../charts/PieChartContainer";
import HomeCard from "../components/Homepage/HomeCard";
import Navbar from "../components/Navbar";
import classes from "./Homepage.module.scss";
import toastr from "toastr";
import { useEffect, useState } from "react";
import { base_url } from "../api";

const Homepage = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [capital, setCapital] = useState(0);
  const [assetPosition, setAssetPosition] = useState(0);
  const [cashPosition, setCashPosition] = useState(0);
  const [realized, setRealized] = useState(0);
  const [totalPnl, setTotalPnl] = useState(0);
  const [pnlPercentage, setPnlPercentage] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);

  const username = localStorage.getItem("username");

  useEffect(() => {
    let interval;
    const fetchData = () => {
      fetch(`${base_url}/users/${username}/get_portfolio`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCapital(data.user.capital)
          setTotalPnl(data.user.total_pnl)
          setPnlPercentage(data.user.total_pnl / data.user.capital * 100)
          setRealized(data.user.realized)
          setAssetPosition(data.user.asset_position)
          setCashPosition(data.user.cash_position)
          if (data.assets.length === 0) {
            toastr.info("You have not any asset", "info");
            clearInterval(interval); // Hata durumunda aralığı temizleyelim.
          }
          else {
            setAssets(data.assets);
          }
        })
        .catch((e) => {
          toastr.error(e, "Error");
          clearInterval(interval); // Hata durumunda aralığı temizleyelim.
        });
    };
    interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.body}>
      <Navbar />
      <div className={classes.h90}>
        <div className={classes.cardContainer}>
          <HomeCard id="1" title="Portfolio Value" value={capital + totalPnl} />
          <HomeCard
            id="2"
            title="Total PNL"
            value={totalPnl}
            percentage={pnlPercentage}
          />
          <HomeCard id="3" title="Cash Position" value={cashPosition} />
          <HomeCard
            id="4"
            title="Realized"
            value={realized}
            percentage={(realized / capital) * 100}
          />
        </div>
        <div className={classes.chartSection}>
          <LineChartContainer />
          <PieChartContainer
            assets={assets}
            cashPosition={cashPosition}
            assetPosition={assetPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
