import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";


export default function MyRegistries() {
const [data,setData] = useState({});

const getDataFromAPI = () => {

    axios.get("/api/getRegistere/",{withCredentials:true}).then((response)=>{
        console.log(response.data);
        return {data: "1"};
    })

}


useEffect(() => {
    setData(getDataFromAPI);
});

    return (<>
        {data}
    </>);


}