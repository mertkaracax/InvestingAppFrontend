import React, { useState } from "react";
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
import TransactionModal from "./modals/TransactionModal";

function App() {
  const [postListener, setPostListener] = useState(false);
  const dispatch = useDispatch();

  const capitalFormIsVisible = useSelector(
    (state) => state.ui.capitalFormIsVisible
  );

  const transactionFormIsVisible = useSelector(
    (state) => state.ui.transactionFormIsVisible
  );

  const closeCapitalFormHandler = () => {
    dispatch(uiActions.toggleCapitalForm());
  };

  const closeTransactionFormHandler = () => {
    dispatch(uiActions.toggleTransactionForm());
  };

  return (
    <>
      {capitalFormIsVisible && (
        <CapitalModal onClose={closeCapitalFormHandler} />
      )}
      {transactionFormIsVisible && (
        <TransactionModal
          onListen={() => {
            setPostListener((prev) => {
              return !prev;
            });
          }}
          onClose={closeTransactionFormHandler}
        />
      )}
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
