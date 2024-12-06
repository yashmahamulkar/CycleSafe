// src/RoutingMap.js
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Routing = ({ startPoint, endPoint }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint.lat, startPoint.lng),
        L.latLng(endPoint.lat, endPoint.lng),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    // Start point geocoder
    const startGeocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    })
      .on('markgeocode', (e) => {
        const newStart = e.geocode.center;
        routingControl.spliceWaypoints(0, 1, newStart); // Update start waypoint
      })
      .addTo(map);

    // End point geocoder
    const endGeocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    })
      .on('markgeocode', (e) => {
        const newEnd = e.geocode.center;
        routingControl.spliceWaypoints(1, 1, newEnd); // Update end waypoint
      })
      .addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, startPoint, endPoint]);

  return null;
};

const RoutingMap = () => {
  const [startPoint, setStartPoint] = useState({ lat: 51.505, lng: -0.09 });
  const [endPoint, setEndPoint] = useState({ lat: 51.51, lng: -0.1 });

  return (
    <MapContainer center={[startPoint.lat, startPoint.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      <Routing startPoint={startPoint} endPoint={endPoint} />
    </MapContainer>
  );
};

export default RoutingMap;
