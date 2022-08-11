import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    const [data,setData] = useState({});

    useEffect(() => {
        axios.get("/api/getRegistered",{withCredentials:true})
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
    });

    return (
        <>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={hu}
        eventSources={[
            {
                events: Object.keys(data).map((key) => [Number(key), data[key]]),
                color: 'black',
                textColor: 'yellow'
            }
        ]
        }

    />
        </>
    )
}