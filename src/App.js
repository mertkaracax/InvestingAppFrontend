import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Portfolio from "./pages/Portfolio";
import "./App.css";
import Transactions from "./pages/Transactions";
import { useDispatch, useSelector } from "react-redux";
import CapitalModal from "./modals/CapitalModal";
import { uiActions } from "./store/uiSlice";

function App() {
  const dispatch = useDispatch();

  const capitalFormVisible = useSelector(
    (state) => state.ui.capitalFormIsVisible
  );

  const closeCapitalFormHandler = () => {
    dispatch(uiActions.toggleCapitalForm());
  };

  return (
    <>
      {capitalFormVisible && <CapitalModal onClose={closeCapitalFormHandler} />}
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Portfolio" element={<Portfolio />}></Route>
          <Route path="/Homepage" element={<Homepage />}></Route>
          <Route path="/Transactions" element={<Transactions />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
