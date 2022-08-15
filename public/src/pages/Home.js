import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get("/api/getRegistered",{withCredentials:true})
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
    },[]);

    return (
        <>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={hu}
        eventSources={[
            {
                //events: Object.keys(data).map((key) => [Number(key), data[key]]),
                events: function(info, successCallback, failureCallback) {
                    axios.get("/api/getRegistered",{withCredentials:true})
                        .then((res) =>
                        {
                            console.log(res.data);
                            setData(res.data);
                            successCallback(
                                res.data.map(function(eventEl) {
                                    return {
                                        title: eventEl.title,
                                        start: eventEl.start,
                                        end: eventEl.end
                                    }
                                })
                            )

                        })
                },
                color: 'black',
                textColor: 'yellow'
            }
        ]
        }

    />
        </>
    )
}