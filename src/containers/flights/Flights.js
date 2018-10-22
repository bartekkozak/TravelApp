import React, { Component } from "react";

class Flights extends Component {
  state = {};

  getFlights = async e => {
    e.preventDefault();
    const API_KEY = "8qIKZeA1SAGT1VMnpHcDzuA4FnDdFlN5";
    const api_call = await fetch(
      `https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=${API_KEY}&origin=FRA&destination=LON&departure_date=2018-10-22--2018-10-28`
    );

    const data = await api_call.json();

    console.log(data);
  };

  render() {
    return (
      <div>
        LOTY
        <button onClick={this.getFlights}>POBIERZ LOTY</button>
      </div>
    );
  }
}

export default Flights;
