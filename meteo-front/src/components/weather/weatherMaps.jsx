// src/components/Weather/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const WeatherMap = ({ latlont }) => {
    // console.log('latlont:', latlont);
    const { latitude, longitude } = latlont;
    
  if (!latitude || !longitude) return null;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[latitude, longitude]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Position : {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;