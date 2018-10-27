import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Flights from "./containers/Flights/Flights";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import Homepage from "./components/Homepage/Homepage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/flights" component={Flights} />
              <Route path="/" exact component={Homepage} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
