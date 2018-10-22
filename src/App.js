import React, { Component } from "react";
import "./App.scss";
import CustomMap from "./containers/map/CustomMap";
import Flights from "./containers/flights/Flights";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="test">FLIGHT APENCJUM</div>
        <CustomMap />
        <Flights />
      </div>
    );
  }
}

export default App;
