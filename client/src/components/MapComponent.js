import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import TorontoMap from '../static/images/tmap.jpg'; // Update this path
import startMarkerIcon from '../static/images/tmap.jpg'; // Custom start marker
import endMarkerIcon from '../static/images/tmap.jpg'; // Custom end marker
import jsonData from '../data/inter.json'; // Your JSON data for additional markers
import customMarkerIcon from '../static/images/activecctvmarker3.png'; // Custom marker icon

const features = [
    { title: 'Real-Time Tracking', description: 'Monitor cyclist locations in real time.', image: startMarkerIcon },
    { title: 'Safety Alerts', description: 'Get notified about unsafe conditions.', image: startMarkerIcon },
    { title: 'Data Analytics', description: 'Analyze cycling patterns and trends.', image: startMarkerIcon },
    { title: 'User-Friendly Dashboard', description: 'Access all features in a single dashboard.', image: startMarkerIcon },
];

const LandingPage = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [markersData, setMarkersData] = useState([]);

    // Custom marker icons
    const startIcon = L.icon({
        iconUrl: startMarkerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const endIcon = L.icon({
        iconUrl: endMarkerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    // Create a custom icon for additional markers
    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [25, 25],
        iconAnchor: [12, 41],
    });

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                if (!fromCoords) {
                    setFromCoords(e.latlng);
                    setFrom(`${e.latlng.lat}, ${e.latlng.lng}`);
                } else if (!toCoords) {
                    setToCoords(e.latlng);
                    setTo(`${e.latlng.lat}, ${e.latlng.lng}`);
                } else {
                    setFromCoords(null);
                    setToCoords(null);
                    setFrom('');
                    setTo('');
                }
            },
        });
        return null;
    };

    useEffect(() => {
        if (routingControl) {
            routingControl.setWaypoints([fromCoords, toCoords].filter(Boolean));
        }
    }, [fromCoords, toCoords, routingControl]);

    const showRoute = () => {
        if (fromCoords && toCoords) {
            const newRoutingControl = L.Routing.control({
                waypoints: [L.latLng(fromCoords.lat, fromCoords.lng), L.latLng(toCoords.lat, toCoords.lng)],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                createMarker: () => null, // Disable marker creation
            }).addTo(map);
            setRoutingControl(newRoutingControl);
        }
    };

    useEffect(() => {
        const parsedData = jsonData.features.map((feature) => {
            const lat = feature.properties.Latitude;
            const lng = feature.properties.Longitude;

            return {
                lat,
                lng,
                vehVol: feature.properties.veh_vol,
                pedVol: feature.properties.ped_vol,
            };
        });
        setMarkersData(parsedData);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
         
            

  

<Container>

                {/* Leaflet Map */}
                <MapContainer center={[43.7, -79.42]} zoom={12} style={{ height: '400px', width: '100%' }} whenCreated={setMap}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler />
                    {fromCoords && (
                        <Marker position={fromCoords} icon={startIcon}>
                            <Popup>
                                Start: {from}
                            </Popup>
                        </Marker>
                    )}
                    {toCoords && (
                        <Marker position={toCoords} icon={endIcon}>
                            <Popup>
                                End: {to}
                            </Popup>
                        </Marker>
                    )}
                    {/* Custom markers from JSON data */}
                    {markersData.map((marker, index) => (
                        <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
                            <Popup>
                                <div>
                                    <p>Vehicle Volume: {marker.vehVol}</p>
                                    <p>Cyclist Volume: {(marker.pedVol / 10).toFixed(0)}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Container>

        </div>
    );
};

export default LandingPage;
