import { useNavigate } from "react-router-dom";
import LineChartContainer from "../charts/LineChartContainer";
import { PieChartContainer } from "../charts/PieChartContainer";
import HomeCard from "../components/Homepage/HomeCard";
import Navbar from "../components/Navbar";
import classes from "./Homepage.module.scss";
import toastr from "toastr";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../api";

const Homepage = () => {
  const navigate = useNavigate();
  const baseUrl = getBaseUrl();
  const [assets, setAssets] = useState([]);
  const [realized, setRealized] = useState(0);
  const [assetPosition, setAssetPosition] = useState(0);
  const [assetsCapital, setAssetsCapital] = useState(0);
  const [cashPosition, setCashPosition] = useState(0);
  const [capital, setCapital] = useState(0);
  const [totalPnl, setTotalPnl] = useState(0);
  const [pnlPercentage, setPnlPercentage] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);

  const username = localStorage.getItem("username");

  useEffect(() => {
    let interval;
    const fetchData = () => {
      fetch(`${baseUrl}/getAssets/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setAssets(data.assets);
          setAssetsCapital(data.assetsCapital);
          setTotalPnl(data.totalPnl);
          setPnlPercentage(data.pnlPercentage && data.pnlPercentage);
          console.log(data);
          if (data.assets.length === 0) {
            toastr.info("You have not any asset", "info");
            clearInterval(interval); // Hata durumunda aralığı temizleyelim.
          }
        })
        .catch((e) => {
          toastr.error(e, "Error");
        });
      fetch(`${baseUrl}/getUser/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setCapital(data.user.capital);
          setRealized(data.user.realized);
          setAssetPosition(data.user.assetPosition);
          setCashPosition(data.user.cashPosition);
          console.log(data.user);
        })
        .catch((e) => {
          toastr.error(e, "Error");
        });
    };
    interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(capital + totalPnl);
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
