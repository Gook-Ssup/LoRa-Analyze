import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// local
import REQUEST from "REQUEST/v0";

function Maps() {
  const [view, setView] = useState({
    latitude: 35.235102456647034,
    longitude: 129.0828258896565,
  });
  const [gatewayList, setGatewayList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    REQUEST.map.getGateways().then((result) => {
      if (result.success) {
        const updateGatewayList = result.gateways;

        if (updateGatewayList.length > 0) {
          // TODO : Need Leaflet Map Reload
          let latitudeSum = 0;
          let longitudeSum = 0;
          updateGatewayList.forEach(gateway => {
            latitudeSum += gateway.latitude;
            longitudeSum += gateway.longitude;
          });
          setView({latitude: latitudeSum/updateGatewayList.length, longitude: longitudeSum/updateGatewayList.length});
        }
        setGatewayList(updateGatewayList);
      } else {
        console.log("Error");
      }
    });
  }, [reload]);

  let Markers = gatewayList.map((gateway, index) => (
    <Marker key={gateway.id} position={[gateway.latitude, gateway.longitude]}>
      <Popup>{gateway.name + '[' + gateway._id.toString() + ']'}</Popup>
    </Marker>
  ));

  return (
    <MapContainer
      center={[view.latitude, view.longitude]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "85vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {Markers}
      {/* <LocationMarker></LocationMarker> */}
    </MapContainer>
  );
}

export default Maps;
