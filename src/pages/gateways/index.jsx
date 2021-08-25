import React, { useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import AddLocationIcon from '@material-ui/icons/AddLocation';

// shared
import PageContainer from "shared/PageContainer";
import PageCard from 'shared/PageCard';
import REQUEST from "REQUEST/v0";

const Gateways = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const [gatewayList, setGatewayList] = useState([]);
    const [reload, setReload] = useState(false);

    // useEffect(() => {
    //     REQUEST.map.getGateways().then((result) => {
    //         if (result.success) {
    //             const updateGatewayList = result.gateways;
    //             setGatewayList(updateGatewayList);
    //         } else {
    //             console.log("Error");
    //         }
    //     });
    // }, [reload]);

    return (
        <PageContainer>
            <PageCard >
                <Button variant="outlined" color="#ffffff"><AddLocationIcon />Add</Button>
                <Table className="Gateways" aria-label="simple table" style={{ background: "rgb(0,0,0,0)" }}>
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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PageCard>
        </PageContainer>
    );
};

export default Gateways;