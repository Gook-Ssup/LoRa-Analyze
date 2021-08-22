import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Maps() {
  return (
    <MapContainer center={[35.235102456647034, 129.0828258896565]} zoom={17} scrollWheelZoom={true} style={{height:"85vh"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[35.235102456647034, 129.0828258896565]}>
        <Popup>
          GateWay
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Maps;
