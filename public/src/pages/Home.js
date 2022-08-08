import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import hu from '@fullcalendar/core/locales/hu'

export default function Home() {

    return (
        <>
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={hu}
    />
        </>
    )
}