import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";


function App() {
    const [cookies, setCookie] = useCookies();
    const [userId, setUserId] = useState(null);
    const checkCookieExists = () => {
        const userid = Cookies.get('userId');
        const role = Cookies.get('role');
        if (userid) {
            console.log(userid);
            setUserId(userid);
        }
    }
    useEffect(() => {
        console.log("befutott");
        console.log(cookies);

        setUserId(Cookies.get('userId'));
    });

    if (cookies.userId) {
        return (
        <>
            <Dashboard />
        </>
        );
    } else {
        return (<>
            <Login/>
        </>);
    }
}


export default App;
