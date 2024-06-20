import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const zoomedIcon = new L.Icon({
  iconUrl: './icono_test.png',
  iconSize: [50, 55],
  iconAnchor: [17, 55],
  popupAnchor: [1, -34],
  shadowSize: [55, 55]
});

const ZoomHandler = ({ setZoomLevel }) => {
  useMapEvents({
    zoomend: (event) => {
      const zoomLevel = event.target.getZoom();
      setZoomLevel(zoomLevel);
    }
  });
  return null;
};

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(5.5); // Nivel de zoom inicial
  const position = [-12.19, -77.22]; // Default map position

  const points = [
    {
      "Mercado": "BUENOS AIRES - TRUJILLO",
      "lat": -8.1448805,
      "lon": -79.0517936
    },
    {
      "Mercado": "ECOMPHISA - SANTA ROSA",
      "lat": -6.715,
      "lon": -79.908
    },
    {
      "Mercado": "EL PALOMAR - AREQUIPA",
      "lat": -16.7744719,
      "lon": -71.9812349
    },
    {
      "Mercado": "IPA JOSE OLAYA - PISCO",
      "lat": -13.7114864,
      "lon": -76.2279989
    },
    {
      "Mercado": "MERCADO MAYORISTA GRAU - TACNA",
      "lat": -18.0031063,
      "lon": -70.2632084
    },
    {
      "Mercado": "MULTIMERCADOS ZONALES S.A (MINKA)",
      "lat": -12.0482144,
      "lon": -77.1140145
    },
    {
      "Mercado": "SAN PEDRO DE RIO SECO - CERRO COLORADO",
      "lat": -16.325,
      "lon": -71.577
    },
    {
      "Mercado": "TERMINAL PESQUERO DPA CHIMBOTE",
      "lat": -9.0762734,
      "lon": -78.603704
    },
    {
      "Mercado": "TERPESA - PIURA",
      "lat": -5.1756846,
      "lon": -80.6749674
    },
    {
      "Mercado": "VENTANILLA",
      "lat": -11.8825564,
      "lon": -77.2235401
    },
    {
      "Mercado": "VILLA MARÍA DEL TRIUNFO",
      "lat": -12.1741849,
      "lon": -76.9649565
    }
  ]
  ;

  const getIcon = (zoomLevel) => {
    return zoomLevel > 7 ? zoomedIcon : defaultIcon;
  };

  return (
    <MapContainer center={position} zoom={zoomLevel} style={{ height: '100vh', width: '100%' }}>
      <ZoomHandler setZoomLevel={setZoomLevel} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lon]} icon={getIcon(zoomLevel)}>
          <Popup>{point.Mercado}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
