import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";


export default function MyRegistries() {
const [data,setData] = useState(null);

const getDataFromAPI = () => {

    axios.get("/api/getRegistered",{withCredentials:true}).then((response)=>{
        console.log(response.data);
        return response.data;
    })

}


useEffect(() => {
    setData(getDataFromAPI);
});

    return (<>
        <h1>1</h1>
    </>);


}