"use client";

import { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const CustomIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776063.png",
  iconSize: [38, 38],
});

const Maps = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const position: LatLngTuple = [-7.435018404128583, 109.24912478085912];

  useEffect(() => {
    const container = document.getElementById("map") as HTMLDivElement;

    if (container != null) {
      const mapContainer = container as any;
      if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }
    }

    const map = L.map("map").setView(position, 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
    ).addTo(map);

    L.Marker.prototype.options.icon = CustomIcon;

    const marker = L.marker(position).addTo(map);
    marker.bindPopup("<b>Putra Tunggal</b>").openPopup();
  }, [position]);

  return (
    <div
      id="map"
      className="h-full w-full rounded-xl shadow-lg bg-white overflow-hidden z-10"
    ></div>
  );
};

export default Maps;
