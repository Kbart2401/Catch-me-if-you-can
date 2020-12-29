import React, {useState} from "react"; 
import ReactMapGL, {Marker} from "react-map-gl"; 
import * as parkData from "./skateboard-parks.json"; 
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"})

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 45.4211, 
        longitude: -75.6903,
        zoom: 10,
        width: "100vw",
        height: "100vh",   
    })


    directionsClient.getDirections({
        profile: 'walking',
        geometries: 'geojson', 
        waypoints: [
            {
                coordinates: [-75.6972, 45.4215],
                approach: 'unrestricted'
            },
            {
                coordinates: [-75.546518086577947, 45.467134581917357]
            }
        ]
    })
        .send()
        .then(response => {
            console.log(response.body); 
        })
    

    return (
        <ReactMapGL {...viewport} 
        mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
        mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
        onViewportChange={viewport => setViewport(viewport)}>
            <Marker latitude={parkData.features[0].geometry.coordinates[1]} longitude={parkData.features[0].geometry.coordinates[0]}>
                    <img src="https://raw.githubusercontent.com/leighhalliday/mapbox-react-demo/master/public/skateboarding.svg"
                    style={{width:"20px", height:"20px"}}/>
            </Marker>
        
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
