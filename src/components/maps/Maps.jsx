import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


// Configuração do ícone personalizado para a ISS
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const ISSMap = () => {
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    const fetchISSLocation = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        const { latitude, longitude } = data.iss_position;
        setPosition([latitude, longitude]);
      } catch (error) {
        console.error('Error fetching ISS location:', error);
      }
    };

    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 2000); // Atualiza a cada 2 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    
    <MapContainer center={position} zoom={2} style={{ height: '1000px', width: '1500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={issIcon}>
        <Popup>
          ISS esta aqui: <br /> Latitude: {position[0]} <br /> Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ISSMap;
