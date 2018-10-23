import React, { Component } from "react";

class Flights extends Component {
  state = {
    departureDate: "",
    returnDate: "",
    origin: "",
    destination: "",
    currentDate: "",
    flights: [],
    error: ""
  };

  componentDidMount() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = `${yyyy}-${mm}-${dd}`;
    this.setState({ currentDate: today });
  }

  getFlights = async e => {
    e.preventDefault();
    this.setState({ flights: [] });
    let API_KEY = "8qIKZeA1SAGT1VMnpHcDzuA4FnDdFlN5";
    let api_call = await fetch(
      `https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=${API_KEY}&origin=FRA&destination=LON&departure_date=${
        this.state.departureDate
      }--${this.state.returnDate}`
    );

    let data = await api_call.json();

    if (data.results) {
      this.setState({ flights: data.results, error: "" });
    } else {
      this.setState({ error: "musisz wybrac daty" });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { flights } = this.state;
    let selectedFlights;

    if (typeof flights !== "undefined" && flights.length > 0) {
      selectedFlights = flights.map((flight, key) => {
        return (
          <li key={key}>
            CENA LOTU : {flight.price} USD, AIRLINE: {flight.airline},
            DESTINATION: {flight.destination}, DEPARTURE DATE:
            {flight.departure_date}, RETURN DATE: {flight.return_date}
          </li>
        );
      });
    }

    return (
      <div>
        <form onSubmit={this.getFlights}>
          <input
            type="date"
            name="departureDate"
            value={this.state.departureDate}
            onChange={this.onChange}
            min={this.state.currentDate}
          />
          <input
            type="date"
            name="returnDate"
            value={this.state.returnDate}
            onChange={this.onChange}
          />
          <input type="submit" value="pobierz loty" />
        </form>
        <p>DEPARTURE DATE: {this.state.departureDate} </p>
        <p>RETURN DATE: {this.state.returnDate} </p>
        <p>CURRENT DATE: {this.state.currentDate} </p>
        <h2>LOTY:</h2>
        <ul>
          {typeof this.state.flights !== "undefined" &&
          this.state.flights.length > 0
            ? selectedFlights
            : this.state.error}
        </ul>
      </div>
    );
  }
}

export default Flights;
