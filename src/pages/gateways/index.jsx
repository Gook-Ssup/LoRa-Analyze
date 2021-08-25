import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import AddLocationIcon from "@material-ui/icons/AddLocation";

// shared
import PageContainer from "shared/PageContainer";
import PageCard from "shared/PageCard";
import REQUEST from "REQUEST/v0";

const Gateways = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [gatewayList, setGatewayList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
      REQUEST.general.getGateways().then((result) => {
          if (result.success) {
              const updateGatewayList = result.gateways;
              setGatewayList(updateGatewayList);
          } else {
              console.log("Error");
          }
      });
  }, [reload]);

  const handleAddGateway = () => {
    REQUEST.general
      .addGateway({
        name: "LabGateways(USPR)",
        latitude: 35.235102456647034,
        longitude: 129.0828258896565,
      })
      .then((result) => {
        if (result.success) {
          console.log(result);
        } else {
          console.log("Error");
        }
      });
  };

  return (
    <PageContainer>
      <PageCard>
        <Button variant="outlined" onClick={handleAddGateway}>
          <AddLocationIcon />
          Add
        </Button>
        <Table
          className="Gateways"
          aria-label="simple table"
          style={{ background: "rgb(0,0,0,0)" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell align="right">MAC</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Detect Count(Origin)</TableCell>
              <TableCell align="right">Detect Count(Charm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gatewayList.map((gateway) => (
              <TableRow key={gateway._id}>
                <TableCell component="th" scope="row">
                  {gateway._id}
                </TableCell>
                <TableCell align="right">{gateway.name}</TableCell>
                <TableCell align="right">{gateway.name}</TableCell>
                <TableCell align="right">{0}</TableCell>
                <TableCell align="right">{0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </PageContainer>
  );
};

export default Gateways;
