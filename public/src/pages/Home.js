import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import axios from "axios";
import {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
    AccountCircleTwoTone,
    ChevronRight,
    EventAvailableTwoTone,
    EventBusyTwoTone,
    EventNoteTwoTone
} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";

export default function Home() {
    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openedData,setOpenedData] = useState([]);
    const [openedUser,setOpenedUser] = useState([]);

    useEffect(() => {
        axios.get("/api/getRegistered",{withCredentials:true})
            .then((res) => {
                //console.log(res.data);
                setData(res.data);
            });
    },[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEventClick = (info) => {
        console.log(info.event);
        let obj = {};
        obj = info.event;
        obj.startString = formatDate(obj.start);
        obj.endString = formatDate(obj.end);
        obj.fullName = obj.extendedProps.user.fullName;
        console.log(obj);
        setOpenedData(obj);
        setOpenedUser(obj.extendedProps);
        console.log(openedUser);
        handleClickOpen();
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={hu}
        events={data}
        eventClick={(info) => {handleEventClick(info)}}

    />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{openedData.title}</DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <AccountCircleTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Felhasználó"} secondary={openedData.fullName} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventNoteTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Ok"} secondary={openedData.title} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventAvailableTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Kezdődátum"} secondary={openedData.startString} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventBusyTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Végdátum"} secondary={openedData.endString} />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Rendben</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}