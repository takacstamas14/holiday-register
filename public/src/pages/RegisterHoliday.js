import * as React from 'react';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

export default function RegisterHoliday() {
    const [value, setValue] = React.useState([null, null]);
    const [startDate,setStartDate] = React.useState([null,null])
    const [endDate,setEndDate] = React.useState([null,null])
    const selectDates = async (param) => {
        console.log(param);
        setStartDate(param.start);
        setEndDate(param.end);

    }
    const sendDates = async () => {
        if(startDate !== null && endDate !== null)
        {
            axios.post("/api/saveDate",{
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            },{withCredentials: true}).then((response)=> {alert(response.msg)});
        }
    }
    return (
        <>
            <Typography variant="h5" gutterBottom component="div">
                Szabadság bejegyzése
            </Typography>
            <FullCalendar
                plugins={[interactionPlugin,dayGridPlugin]}
                initialView="dayGridMonth"
                locale={hu}
                selectable="true"
                select={(e) => selectDates(e)}
            />
            <Button variant="outlined" onClick={sendDates}>Mentés</Button>
        </>
    )
}