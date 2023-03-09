import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Common/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

function App({ basename }) {
  return (
    <>
      <ToastContainer theme="colored" />
      <BrowserRouter basename={basename}>
        <Header />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" exact={true} to="/dashboard" />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
