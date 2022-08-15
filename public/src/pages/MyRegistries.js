import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Table} from "@fullcalendar/daygrid";
import Paper from "@mui/material/Paper";


export default function MyRegistries() {
const [data,setData] = useState(null);
const [rows,setRows] = useState([]);
const getDataFromAPI = () => {
    axios.get("/api/getRegistered",{withCredentials:true}).then((response)=>{
        setRows(response.data);
    })
}
useEffect(() => {
    getDataFromAPI();

});

    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Szabadság oka</TableCell>
                        <TableCell align="right">Kezdődátum</TableCell>
                        <TableCell align="right">Végdátum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.start}</TableCell>
                            <TableCell align="right">{row.end}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);


}