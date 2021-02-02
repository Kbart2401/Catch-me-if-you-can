import React, { useState, useEffect, useRef } from 'react'; 
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
import StartPin from './StartPin';
import EndPin from './EndPin'; 
const mapboxAPI = process.env.REACT_APP_MAPBOX;
const mapboxSTYLE = process.env.REACT_APP_MAPBOX_STYLE;

const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: mapboxAPI });

const SavedMap = (props) => {
    const [viewport, setViewport] = useState({}); 
    const [startMarker, setStartMarker] = useState([]);
    const [endMarker, setEndMarker] = useState([]); 
    const wayPoints = useRef([])
    const [routeData, setRouteData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false); 

    useEffect(() => {
        setStartMarker(props.routeCoordinates[0]);
        setEndMarker(props.routeCoordinates[props.routeCoordinates.length-1]);     
        wayPoints.current = props.routeCoordinates.map(point => {
            return {
                coordinates: [point[0], point[1]]
            }
        });  
        console.log(wayPoints.current); 
    });

    useEffect(()=> {
        setViewport({
            longitude: startMarker[0], 
            latitude: startMarker[1], 
            zoom: 14, 
            width: "65vw", 
            height: "65vh",
        });
    }, [startMarker]);

    //api request to mapbox to get route directions per given coordinates
    useEffect(() => {
        console.log("HELLOOOO")
        directionsClient.getDirections({
            profile: 'walking', 
            geometries: 'geojson', 
            waypoints: wayPoints.current, 
        })
            .send()
            .then(response => {
                console.log(response); 
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
    }, [wayPoints.current]);

    return (
        <ReactMapGL {...viewport}
            mapboxApiAccessToken={mapboxAPI}
            mapStyle={mapboxSTYLE}
            onViewportChange={viewport => setViewport(viewport)}>
                {isLoaded && 
                <>
                  <Marker   longitude={startMarker[0]} 
                            latitude={startMarker[1]}
                            offsetTop={-20}  
                            offsetLeft={-5}
                    >
                    <StartPin />  
                  </Marker> 
                  <Marker   longitude={endMarker[0]} 
                            latitude={endMarker[1]}
                            offsetTop={-20}  
                            offsetLeft={-5}
                    >
                    <EndPin />  
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