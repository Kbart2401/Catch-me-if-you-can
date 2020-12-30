import React, {useState, useEffect} from "react"; 
import ReactMapGL, {Marker, Layer, Source, GeolocateControl} from "react-map-gl"; 
import Pin from './Pin'; 
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"})

const Map = () => {
    const [viewport, setViewport] = useState({});
    const [markers, setMarkers] = useState([])
    const [routeData, setRouteData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    
    //establish viewport coordinates based on user location
    function success(pos) {
        const crd = pos.coords; 
        setViewport({
            latitude: crd.latitude, 
            longitude: crd.longitude, 
            zoom: 13,
            width: "100vw",
            height: "100vh",   
        })
    };

    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success,error); 


    //api request to the mapbox directions with SDK JS 
    useEffect(() => {
        if (markers[1]) {
            directionsClient.getDirections({
                profile: 'walking',
                geometries: 'geojson', 
                waypoints: markers, 
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
        }
    }, [markers]);


    
    //click event for dropping marker on map
    function clickMarker(event) {
        setMarkers ([...markers, {
            coordinates: [event.lngLat[1], event.lngLat[0]]
        }])
    };

    return (
        <ReactMapGL {...viewport} 
        mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
        mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
        onViewportChange={viewport => setViewport(viewport)} onClick={clickMarker}> 
            {isLoaded &&
            <>
                <Source id="route-data" type="geojson" data={routeData}>
                    <Layer id="route" type="line" paint={{'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75}} />
                </Source>
                {markers.map(marker => {
                    return (
                        <Marker latitude={marker.coordinates[0]} longitude={marker.coordinates[1]}>
                            <Pin /> 
                        </Marker>
                    )
                })}
            </>
            }
        </ReactMapGL>
    )
}

export default Map; 
