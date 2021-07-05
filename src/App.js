import React, { useRef, useEffect, useState } from 'react';
import Covidapi from "./components/covidapi"
import Mapp from "./components/map"

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax





function App() {


  return (
    <> 
      {/* <Covidapi /> */}

      <Mapp />


  
    </>
    
  );
}

export default App;
