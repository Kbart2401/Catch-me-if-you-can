import React, { useState, useEffect } from 'react'; 
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
import SearchPin from './SearchPin'; 
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2pjMDUzYnozMzVhMzBucDAzcXBhdXdjIn0.kEXpfO6zDjp9J4QXnwzVcA" });

const SavedMap = (props) => {
    const [viewport, setViewport] = useState({}); 
    const [startMarker, setStartMarker] = useState([]);
    const [endMarker, setEndMarker] = useState([]); 
    const [routeData, setRouteData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);  

    setStartMarker(props.route_coordinates[0]);
    setEndMarker(props.route_coordinates[route_coordinates.length-1]);

    //establish viewport coordinates based on start marker
    function success() {
        setViewport({
            longitude: startMarker[0], 
            latitude: startMarker[1], 
            zoom: 15, 
            width: "65vw", 
            height: "65vh",  
        })
    };

    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    };

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    //api request to mapbox to get route directions per given coordinates
    directionsClient.getDirections({
        profile: 'walking', 
        geometries: 'geojson', 
        waypoints: props.route_coordinates 
    })
        .send()
        .then(response => {
            const route = response.body.routes[0].geometry.coordinates; 
         

        const geojson = {
            type: 'FeatureCollection', 
            features: [
                {
                    type: 'Feature', 
                    geometry: {
                        type: 'LineString', 
                        coordinates: route, 
                    }
                }
            ]
        };
        setRouteData({...geojson}); 
        setIsLoaded(true); 
    });

    return (
        <ReactMapGL {...viewport}
            mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
            mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
            onViewportChange={viewport => setViewport(viewport)} onClick={clickMarker}>
                {isLoaded && 
                <>
                  <Marker longitude={startMarker[0]} latitude={startMarker[1]}>
                    <SearchPin />  
                  </Marker> 
                  <Marker longitude={endMarker[0]} latitude={endMarker[1]}>
                    <SearchPin />  
                  </Marker> 
                  <Source id="saved-route" type="geojson" data={routeData}>
                    <Layer id="route" type="line" paint={{ 'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75 }} />
                  </Source>
                </>
                }
        </ReactMapGL>
    )
}

export default SavedMap; 