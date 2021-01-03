import React, { useState, useEffect } from 'react'; 
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl';
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2pjMDUzYnozMzVhMzBucDAzcXBhdXdjIn0.kEXpfO6zDjp9J4QXnwzVcA" });

const SavedMap = (props) => {
    const [viewport, setViewport] = useState({}); 
    const [startMarker, setStartMarker] = useState([]);
    const [endMarker, setEndMarker] = useState([]); 
    const [routeData, setRouteData] = useState({}); 

    setStartMarker(props.route_coordinates[0]);
    //
}



export default SavedMap; 