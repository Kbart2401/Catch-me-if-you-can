import React, {useState} from "react"; 
import ReactMapGL, {Marker} from "react-map-gl"; 
import * as parkData from "./skateboard-parks.json"; 
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const stylesService = mbxStyles({accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"})

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 45.4211, 
        longitude: -75.6903,
        zoom: 10,
        width: "100vw",
        height: "100vh",   
    })

    function getRoute(end) {
        
    }

    return (
        <ReactMapGL {...viewport} 
        mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
        mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
        onViewportChange={viewport => setViewport(viewport)}>
        
            {/* {parkData.features.map(data => {
               let longitude = data.geometry.coordinates[0];
               let latitude = data.geometry.coordinates[1];
               return (
                <Marker latitude={latitude} longitude={longitude}>
                    <img src="https://raw.githubusercontent.com/leighhalliday/mapbox-react-demo/master/public/skateboarding.svg"
                    style={{width:"20px", height:"20px"}}/>
                </Marker>
               )
            })} */}
        </ReactMapGL>
    )
}

export default Map 
