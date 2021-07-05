import React, { useRef, useEffect, useState } from 'react';
import Covidapi from './covidapi';
import './map.css';


import ReactMapGL, { Marker, Popup } from 'react-map-gl'


import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibXV0YWhpci1hbGkiLCJhIjoiY2txbzZjdHBzMHQ4ZDJ3cGVkbjVpbDlrcSJ9.ZYM5FlNiuZHw75TIXsPaNA';

const data3 = [
    {
        "active": 1458,
        "activePerOneMillion": 54876.72,
        "cases": 45987,
        "casesPerOneMillion": 1548,
        "continent": "Asia",
        "country": "Afghanistan",
        "countryInfo": { _id: 4, iso2: "AF", iso3: "AFG", lat: 33, long: 65 },
        "critical": 1124,
        "criticalPerOneMillion": 28.24,
        "deaths": 15422,
        "deathsPerOneMillion": 131,
        "oneCasePerPeople": 319,
        "oneDeathPerPeople": 7656,
        "oneTestPerPeople": 64,
        "population": 39804251,
        "recovered": 73635,
        "recoveredPerOneMillion": 1849.93,
        "tests": 626211,
        "testsPerOneMillion": 15732,
        "todayCases": 0,
        "todayDeaths": 0,
        "todayRecovered": 0,
    },

    {
        "active": 45923,
        "activePerOneMillion": 1153.72,
        "cases": 124757,
        "casesPerOneMillion": 3134,
        "continent": "Asia",
        "country": "Pakistan",
        "countryInfo": { _id: 5, iso2: "AF", iso3: "AFG", lat: 30, long: 70 },
        "critical": 1124,
        "criticalPerOneMillion": 28.24,
        "deaths": 5199,
        "deathsPerOneMillion": 131,
        "oneCasePerPeople": 319,
        "oneDeathPerPeople": 7656,
        "oneTestPerPeople": 64,
        "population": 39804251,
        "recovered": 73635,
        "recoveredPerOneMillion": 1849.93,
        "tests": 626211,
        "testsPerOneMillion": 15732,
        "todayCases": 0,
        "todayDeaths": 0,
        "todayRecovered": 0,
    },
];



export default function Mapp(props) {


    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 30.3753,
        longitude: 69.3451,
        zoom: 5,
        pitch: 50,

    })

    const [showPopup, togglePopup] = React.useState(false);
    const [myData,setMyData]= useState([]);
    const [currenPlaceId, setCurrentPlaceId] = useState(null);

    const onDataHandler = (enterData)=>{
        const covidData = {
            ...enterData,
            id: Math.random().toString()
        }
        console.log(covidData)
        setMyData(covidData)
        console.log(myData)
    }

    const handleMarkerClick=(id)=>{
        setCurrentPlaceId(id)

    }

    return (
        <>

            <Covidapi onData={onDataHandler}/>
            {/* 
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>

            <div ref={mapContainer} className="map-container" > 

            </div> */}


            <ReactMapGL
                mapStyle={'mapbox://styles/mapbox/dark-v9'}
                mapboxApiAccessToken={'pk.eyJ1IjoibXV0YWhpci1hbGkiLCJhIjoiY2txbzZjdHBzMHQ4ZDJ3cGVkbjVpbDlrcSJ9.ZYM5FlNiuZHw75TIXsPaNA'}
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}

            
            >
                {/* {console.log(covidData)} */}

                {data3.map(p => (
                    <>

                        <Marker latitude={p.countryInfo.lat} longitude={p.countryInfo.long}>

                            {/* <img src = "../img/pointer.png"  width={50} height={50}/> */}
                            <img src="https://img.icons8.com/color/48/000000/map-pin.png" style={{ fontSize: viewport.zoom }} 
                            onClick = {()=>handleMarkerClick(p.countryInfo._id)}
                            />


                        </Marker>


                        {p.countryInfo._id === currenPlaceId && 

                        <Popup
                        latitude={p.countryInfo.lat}
                        longitude={p.countryInfo.long}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => togglePopup(false)}
                        anchor="right"
                        style={{ fontSize: viewport.zoom }}
                        onClose={()=>setCurrentPlaceId(null)}
                        >
                            <div className="card">
                                <div>Country:  {p.country}</div>
                                <div>Population:  {p.population}</div>
                                <div>Cases:  {p.cases}</div>
                                <div>Active:  {p.active}</div>
                                <div>Deaths:  {p.deaths}</div>
                                <div>Recovered:  {p.recovered}</div>
                                <div>Tests:  {p.tests}</div>
                                <div>Today Cases:  {p.todayCases}</div>
                                <div>Today Deaths:  {p.todayDeaths}</div>
                                <div>Today Recovered:  {p.todayRecovered}</div>
                                <div>Last Updated: {p.recoveredPerOneMillion}</div>

                            </div>
                        </Popup>
                        }

                </>

                


                    
                ))}

                {/* <Popup
                    latitude={data[1].countryInfo.lat}
                    longitude={data[1].countryInfo.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => togglePopup(false)}
                    anchor="right" 
                    style = {{fontSize:viewport.zoom}}
                    >
                    <div className="card">
                        <div>Country:  {data[1].country}</div>
                        <div>Population:  {data[1].population}</div>
                        <div>Cases:  {data[1].cases}</div>
                        <div>Active:  {data[1].active}</div>
                        <div>Deaths:  {data[1].deaths}</div>
                        <div>Recovered:  {data[1].recovered}</div>
                        <div>Tests:  {data[1].tests}</div>
                        <div>Today Cases:  {data[1].todayCases}</div>
                        <div>Today Deaths:  {data[1].todayDeaths}</div>
                        <div>Today Recovered:  {data[1].todayRecovered}</div>
                        <div>Last Updated: {data[1].recoveredPerOneMillion}</div>

                    </div>
                </Popup> */}

            </ReactMapGL>





        </>
    );
}
