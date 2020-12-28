import React, {useState} from "react"; 
import ReactMapGL from "react-map-gl"; 

const Map = () => {
const [viewport, setViewport] = useState({
    latitude: 45.4211, 
    longitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "100vh",   
})

    return (
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>

        </ReactMapGL>
    )
}

export default Map 
