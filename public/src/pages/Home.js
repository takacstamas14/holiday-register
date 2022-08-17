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
import {ChevronRight, EventAvailableTwoTone, EventBusyTwoTone} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";

export default function Home() {
    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openedData,setOpenedData] = useState([]);

    useEffect(() => {
        axios.get("/api/getRegistered",{withCredentials:true})
            .then((res) => {
                console.log(res.data);
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
        console.log(info);
        setOpenedData(info.event);
        //handleClickOpen();
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
                <DialogTitle>{openedData.fullName}</DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ChevronRight />
                            </ListItemIcon>
                            <ListItemText primary={openedData.title} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventAvailableTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={openedData.start} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventBusyTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={openedData.end} />
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