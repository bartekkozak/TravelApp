import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import CustomMarker from "./CustomMarker";

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
    haveUserLocation: false
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
      <Map className="map__container" center={position} zoom={this.state.zoom}>
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
    );
  }
}

export default CustomMap;
