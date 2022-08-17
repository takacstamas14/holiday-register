import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import axios from "axios";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormHelperText, Input, InputAdornment, InputLabel,
    ListItem
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
    AccountCircle,
    AccountCircleTwoTone,
    ChevronRight, EmailTwoTone,
    EventAvailableTwoTone,
    EventBusyTwoTone,
    EventNoteTwoTone, Group, Lock, SaveAsTwoTone
} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import {DataGrid, huHU} from "@mui/x-data-grid";

export default function Home() {
    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        axios.get("/api/getAllUsers",{withCredentials:true})
            .then((res) => {
                console.log(res.data)
                let arr = [];
                res.data.forEach(
                    obj => {arr.push(obj)}
                );
                console.log(arr);
                setData(arr);
            });
    },[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            resizable: true,
            minWidth: 150
        },
        {
            field: 'fullName',
            headerName: 'Név',
            minWidth: 250,
            editable: true,
            resizable: true
        },
        {
            field: 'emailAddress',
            headerName: 'E-mail',
            minWidth: 250,
            editable: true,
            resizable: true
        },
        {
            field: 'role',
            headerName: 'Jogosultság',
            minWidth: 250,
            editable: true,
            resizable: true
        },
    ];

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    localeText={huHU.components.MuiDataGrid.defaultProps.localeText}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </>
    )
}