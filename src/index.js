import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import toastr from "toastr";
import { Provider } from "react-redux";
import store from "./store/redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
toastr.options.closeEasing = "swing";
toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
toastr.options.closeButton = true;
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
