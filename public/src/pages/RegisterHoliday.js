import * as React from 'react';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";

export default function RegisterHoliday() {
    const [value, setValue] = React.useState([null, null]);
    const [startDate,setStartDate] = React.useState([null,null])
    const [endDate,setEndDate] = React.useState([null,null])
    const [open, setOpen] = React.useState(false);
    const [szabadsagOk, setSzabadsagOk] = React.useState();


    const selectDates = async (param) => {
        console.log(param);
        setStartDate(param.start);
        setEndDate(param.end);

    }
    const sendDates = async () => {
        if(startDate !== null && endDate !== null)
        {
            axios.post("/api/saveDate",{
                startDate: startDate.toISOString().split('.')[0],
                endDate: endDate.toISOString().split('.')[0],
                title: szabadsagOk
            },{withCredentials: true}).then((response)=> {console.log(response);handleClose();});
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FullCalendar
                plugins={[interactionPlugin,dayGridPlugin]}
                initialView="dayGridMonth"
                locale={hu}
                selectable="true"
                select={(e) => selectDates(e)}
            />
            <Button variant="outlined" onClick={handleClickOpen}>Mentés</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Szabadság bejegyzése</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kérlek add meg a szabadságod okát az alábbi mezőben
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ok"
                        label="Ok"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={szabadsagOk}
                        onChange={(e) => {setSzabadsagOk(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Mégsem</Button>
                    <Button onClick={sendDates}>Mentés</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}