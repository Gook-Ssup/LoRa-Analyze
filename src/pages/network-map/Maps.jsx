import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import * as d3 from 'd3';

// shared
import REQUEST from "REQUEST/v0";

// local
import MarkerPopup from './MarkerPopup';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

function Maps() {
  const designRef = useRef();

  const [view, setView] = useState({
    latitude: 35.235102456647034,
    longitude: 129.0828258896565,
  });
  const [gatewayList, setGatewayList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const currentElement = designRef.current;
    const documentElement = d3.select(currentElement);
    documentElement
    .call(g => g.select("svg").remove())
    .append('svg')
    .attr('viewBox', `0,0,${100},${100}`);
    // documentElement.createElement('p');
}, [])

  useEffect(() => {
    REQUEST.general.getGateways().then((result) => {
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
    <Marker key={gateway._id} position={[gateway.latitude, gateway.longitude]}>
      {/* <Popup ref={designRef}>{gateway.name + '[' + gateway._id.toString() + ']'}</Popup> */}
      <MarkerPopup gateway={gateway}/>
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
