import * as React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'

export default function RegisterHoliday() {
    const [value, setValue] = React.useState([null, null]);
    const selectDates = async (param) => {
        console.log(param);
    }
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={hu}
                selectable={true}
                select={(e) => selectDates(e)}
            />
        </>
    )
}