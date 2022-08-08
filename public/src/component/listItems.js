import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Event, EventAvailable, Group, Logout, ManageAccounts, Settings} from "@mui/icons-material";
import axios from "axios";


function logout() {

    axios.get("/api/logout",{withCredentials: true}).then(()=>{document.cookie = 'userId=; Max-Age=0;secure;path=\'/\''; window.location.href = "/";});
}

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href="/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Kezdőlap" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Event />
            </ListItemIcon>
            <ListItemText primary="Szabadság bejegyzés" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <EventAvailable />
            </ListItemIcon>
            <ListItemText primary="Eddigi szabadságaim" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ManageAccounts />
            </ListItemIcon>
            <ListItemText primary="Beállítások" />
        </ListItemButton>
        <ListItemButton onClick={logout}>
            <ListItemIcon>
                <Logout />
            </ListItemIcon>
            <ListItemText primary="Kijelentkezés" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Admin panel
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <Group />
            </ListItemIcon>
            <ListItemText primary="Felhasználó kezelés" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Settings />
            </ListItemIcon>
            <ListItemText primary="Beállítások" />
        </ListItemButton>
    </React.Fragment>
);