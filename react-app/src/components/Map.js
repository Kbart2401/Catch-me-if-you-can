import React, {useState, useEffect} from "react"; 
import ReactMapGL, {Marker, Layer, Source} from "react-map-gl"; 
import Pin from './Pin'; 
import * as parkData from "./skateboard-parks.json"; 
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"})



const Map = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [routeData, setRouteData] = useState({})
    
    useEffect(() => {
    //api request to the mapbox directions with SDK JS 
    
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
            const route = response.body.routes[0].geometry.coordinates; 
            const geojson = {
                type: 'FeatureCollection', 
                features: [ 
                    { type: 'Feature', 
                      geometry: {
                        type: 'LineString', 
                        coordinates: route,
                      }, 
                    }
                ]
            };
            //assume no route currently exists (at this point)
            setRouteData({...geojson});
            setIsLoaded(true);
        });
    }, []);


    //set viewport
    const [viewport, setViewport] = useState({
        latitude: 45.4211, 
        longitude: -75.6903,
        zoom: 10,
        width: "100vw",
        height: "100vh",   
    });

    //set marker
    const [marker, setMarker] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
    })

    //drag and drop marker
    const [events, setEvents] = useState({});

    function logDrag(name, event) {
        setEvents({...events, [name]: event.lngLat});
    };

    function dragHandlerStart(event) {
        logDrag('onDragStart', event);
    };

    function dragHandler(event) {
        logDrag('onDrag', event);
    }

    function dragHandlerEnd(event) {
        logDrag('onDragEnd', event);
        setMarker({
            latitude: event.lngLat[1],
            longitude: event.lngLat[0],
        })
    } 

    return isLoaded && (
        <ReactMapGL {...viewport} 
        mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
        mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
        onViewportChange={viewport => setViewport(viewport)}> 
            <Marker latitude={marker.latitude} longitude={marker.longitude} onDragStart={dragHandlerStart} onDrag={dragHandler} 
            onDragEnd={dragHandlerEnd} draggable={true}>
                    <Pin />
            </Marker>
            <Source id="route-data" type="geojson" data={routeData}>
                <Layer id="route" type="line" paint={{'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75}} />
            </Source>
        </ReactMapGL>
    )
}

export default Map; 
