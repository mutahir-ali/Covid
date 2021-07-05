import React, { useState, useEffect } from 'react'
import './covidapi.css';


export default function Covidapi(props) {

    const [data, setData] = useState([]);

    const getCovidData = async () => {


        const res = await fetch('https://corona.lmao.ninja/v2/countries');
        
        setData(await res.json());
       
        console.log(data);

        

        props.onData(data);

    


    }

    useEffect(() => {
        getCovidData();

    }, [])


    return (
        <>
            <h1 className="heading">Corona Virus Tracker</h1>


        </>
    )
}
