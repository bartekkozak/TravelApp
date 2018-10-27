import React, { Component } from "react";
import SpinnerPlane from "../../components/UI/Spinners/SpinnerPlane/SpinnerPlane";
import flyTo from "../../components/Flights/FlightDirections/FlyTo/FlyTo";
import flyFrom from "../../components/Flights/FlightDirections/FlyFrom/FlyFrom";
import CustomMap from "../Map/CustomMap";
import { Container, Row, Col } from "reactstrap";

class Flights extends Component {
  state = {
    departureDate: "",
    returnDate: "",
    origin: "",
    destination: "",
    currentDate: "",
    maxDate: "",
    flights: [],
    error: "",
    originCity: "",
    destinationCity: "",
    loading: false
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

    let addedDays = this.addDays(today, 40);
    let ddMax = addedDays.getDate();
    let mmMax = addedDays.getMonth() + 1; //January is 0!

    let yyyyMax = addedDays.getFullYear();
    if (ddMax < 10) {
      ddMax = "0" + ddMax;
    }
    if (mmMax < 10) {
      mmMax = "0" + mmMax;
    }

    today = `${yyyy}-${mm}-${dd}`;
    addedDays = `${yyyyMax}-${mmMax}-${ddMax}`;

    this.setState({ currentDate: today, maxDate: addedDays });
  }

  addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  getFlights = async e => {
    e.preventDefault();

    this.setState({ flights: [], loading: true });
    let API_KEY = "8qIKZeA1SAGT1VMnpHcDzuA4FnDdFlN5";
    let api_call = await fetch(
      `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${API_KEY}&origin=${
        this.state.originCity
      }&destination=${this.state.destinationCity}&departure_date=${
        this.state.departureDate
      }`
    );
    // let api_call = await fetch(
    //   `https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=${API_KEY}&origin=${
    //     this.state.originCity
    //   }&destination=${this.state.destinationCity}&departure_date=${
    //     this.state.departureDate
    //   }--${this.state.returnDate}`
    // );

    let data = await api_call.json();

    console.log(data);

    if (data.results) {
      this.setState({ flights: data.results, error: "", loading: false });
    } else {
      this.setState({ error: "musisz wybrac daty", loading: false });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { flights } = this.state;
    let selectedFlights;

    console.log(this.state.originCity);
    console.log(this.state.destinationCity);

    if (typeof flights !== "undefined" && flights.length > 0) {
      selectedFlights = flights.map((flight, key) => {
        return (
          <li key={key}>
            CENA LOTU : {flight.price} USD, AIRLINE: {flight.airline},
            DESTINATION: {flight.destination}, DEPARTURE DATE:
            {flight.departure_date},{/* RETURN DATE: {flight.return_date} */}
          </li>
        );
      });
    }

    return (
      <Container>
        <h2>FLIGHTS</h2>
        <CustomMap />
        <form onSubmit={this.getFlights}>
          <input
            type="date"
            name="departureDate"
            value={this.state.departureDate}
            onChange={this.onChange}
            min={this.state.currentDate}
            required
          />

          {/* <input
            type="date"
            name="returnDate"
            value={this.state.returnDate}
            onChange={this.onChange}
            min={this.state.currentDate}
            max={this.state.maxDate}
          /> */}

          {/* SELECT CITIES TO FLY FROM */}

          <select
            name="originCity"
            onChange={this.onChange}
            value={this.state.originCity}
            required
          >
            <option value="" disabled hidden>
              Wybierz skad
            </option>
            {flyFrom.map((option, key) => {
              return (
                <option value={option.value} key={key}>
                  {option.label}
                </option>
              );
            })}
          </select>

          {/* SELECT CITIES TO FLY TO */}

          <select
            name="destinationCity"
            onChange={this.onChange}
            value={this.state.destinationCity}
            required
          >
            <option value="" disabled hidden>
              Wybierz dokad
            </option>
            {flyTo.map((option, key) => {
              return (
                <option value={option.value} key={key}>
                  {option.label}
                </option>
              );
            })}
          </select>

          <input type="submit" value="pobierz loty" />
        </form>
        <p>DEPARTURE DATE: {this.state.departureDate} </p>
        <p>RETURN DATE: {this.state.returnDate} </p>
        <p>CURRENT DATE: {this.state.currentDate} </p>
        <h2>LOTY:</h2>

        {this.state.loading ? (
          <SpinnerPlane />
        ) : (
          <ul>
            {typeof this.state.flights !== "undefined" &&
            this.state.flights.length > 0
              ? selectedFlights
              : this.state.error}
          </ul>
        )}
      </Container>
    );
  }
}

export default Flights;
