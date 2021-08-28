import React from "react";
import { Popup } from "react-leaflet";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const MarkerPopup = ({ gateway }) => {

  console.log(gateway);
  return (
    <Popup>
      <div className="poup-text">
        <h2>{gateway.name}</h2>
        <h4>Id: {gateway._id}</h4>
        <h4>MAC: {gateway.mac}</h4>
        <h5>Latitude: {gateway.latitude}</h5>
        <h5>Longitude: {gateway.longitude}</h5>
        <h5>Detect count (origin): {gateway.longitude}</h5>
        <h5>Detect count (charm): {gateway.longitude}</h5>
        {/* <h5>위도: {gateway.latitude}</h5>
        <h5>경도: {gateway.longitude}</h5> */}
      </div>
    </Popup>
  );
};

export default MarkerPopup;

{
  /* <Popup style={{width:"800px"}}>
        {gateway._id}<br/>
        {gateway.name}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {gateway._id}
                  </TableCell>
                  <TableCell align="right">{gateway.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popup> */
}
