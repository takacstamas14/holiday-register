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

export default function Home() {
    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openedData,setOpenedData] = useState([]);

    useEffect(() => {
        axios.get("/api/userInfo",{withCredentials:true})
            .then((res) => {
                console.log(res.data)
                setData(res.data);
            });
    },[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChange = (key,value) => {
        const tempData = data;
        switch (key)
        {
            case "fullName":
                tempData.fullName = value;
                break;
            case "emailAddress":
                tempData.emailAddress = value;
                break;
        }
        setData(tempData);

    };


    return (
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <FormControl variant="standard" fullWidth={true}>
                    <InputLabel htmlFor="fullName">
                        Teljes n??v
                    </InputLabel>
                    <Input
                        id="fullName"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        value={data.fullName}
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth={true}>
                    <Input
                        id="emailAddress"
                        type="email"
                        label="E-mail c??m"
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailTwoTone />
                            </InputAdornment>
                        }
                        defaultValue={data.emailAddress}
                        onChange={(event) => {handleOnChange("emailAddress",event.target.value)}}
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth={true}>
                    <InputLabel htmlFor="role">
                        Jogosults??g
                    </InputLabel>
                    <Input
                        disabled
                        id="role"
                        type="text"
                        startAdornment={
                            <InputAdornment position="start">
                                <Group />
                            </InputAdornment>
                        }
                        value={data.role}
                    />
                </FormControl>
                <FormControl variant="standard" fullWidth={true}>
                    <InputLabel htmlFor="password">
                        Jelsz??
                    </InputLabel>
                    <Input
                        id="password"
                        type="password"
                        startAdornment={
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        }
                        autoComplete="off"
                    />
                    <FormHelperText id="helpertext">Ha nem szeretn??l jelsz??t v??ltoztatni, akkor hagyd ??resen!</FormHelperText>
                </FormControl>
                <Button variant="contained" endIcon={<SaveAsTwoTone />}>
                    Ment??s
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
                <DialogTitle>{openedData.fullName} - {openedData.title}</DialogTitle>
                <DialogContent dividers>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <AccountCircleTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Felhaszn??l??"} secondary={openedData.fullName} />
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
                            <ListItemText primary={"Kezd??d??tum"} secondary={openedData.startString} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventBusyTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"V??gd??tum"} secondary={openedData.endString} />
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