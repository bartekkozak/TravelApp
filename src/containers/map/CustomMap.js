import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import CustomMarker from "./CustomMarker";
import Auxiliary from "../../hoc/Auxiliary";

const customIcon = L.icon({
  iconUrl: CustomMarker,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class CustomMap extends Component {
  state = {
    latitude: "",
    longitude: "",
    zoom: 2,
    haveUserLocation: false,
    cityInput: "",
    error: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.getGeolocation();
  };

  getGeolocation = async () => {
    await fetch(
      `https://geocode.xyz/Hauptstr.,+57632+${this.state.cityInput}?json=1`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.setState({ error: data.error.description });
        } else {
          this.setState({
            latitude: data.latt,
            longitude: data.longt,
            error: ""
          });
        }
      })
      .catch(err => this.setState({ error: err }));
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 13,
          haveUserLocation: true
        });
      },
      () => {
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            this.setState({
              latitude: location.latitude,
              longitude: location.longitude,
              zoom: 13,
              haveUserLocation: true
            });
          });
      }
    );
  }

  render() {
    const position = [this.state.latitude, this.state.longitude];

    return (
      <Auxiliary>
        <Map
          className="map__container"
          center={position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!this.state.haveUserLocation ? null : (
            <Marker position={position} icon={customIcon}>
              <Popup>TUTAJ BEDZIE JAKIES INFO</Popup>
            </Marker>
          )}
        </Map>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="city"
            name="cityInput"
            value={this.state.cityInput}
            onChange={this.onChange}
          />
          <input type="submit" value="szukaj miasta" />
        </form>
        <p> {this.state.error} </p>
        <p>
          {this.state.latitude} {this.state.longitude}
        </p>
      </Auxiliary>
    );
  }
}

export default CustomMap;
