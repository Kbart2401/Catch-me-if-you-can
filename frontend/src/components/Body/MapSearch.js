import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import Pin from './Pin';
import { useSelector } from 'react-redux';
import './Map.css';
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
import * as turf from '@turf/turf'

const MapSearch = () => {
  const [viewport, setViewport] = useState({});
  const [marker, setMarker] = useState([])
  const [routeData, setRouteData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [distance, setDistance] = useState(0)
  const [selectPoint, setSelectPoint] = useState(null);
  const [names, setName] = useState([]);
  const [index, setIndex] = useState(null);
  const user = useSelector((state) => state.session.user)

  //DELETE ME - we will fetch from backend not from redux
  const createdRoutes = useSelector((state) => state.session.created_routes)

  //establish viewport coordinates based on user location
  function success(pos) {
    const crd = pos.coords;
    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
      zoom: 13,
      width: "65vw",
      height: "65vh",
    })
  };

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  };
  
  navigator.geolocation.getCurrentPosition(success, error);
  
  //click event for dropping marker on map
  function clickMarker(event) {
    setMarker([event.lngLat[1], event.lngLat[0]])
    console.log(marker); 
  };

  //Get geolocation and set marker locations
  // useEffect(() => {
  //   // async function getmarker() {
  //   //   const res = await fetch('/api/routes')
  //   //   const data = await res.json()
  //   //   setMarker(data)
  //   // }
  //   if (createdRoutes) {
  //     const routemarker = createdRoutes.map(route => {
  //       return route.route_coordinates[0]
  //     })
  //     setMarker(routemarker)
  //     }
  // }, [createdRoutes])

return (
  <div className={"map_container"}>
    <ReactMapGL {...viewport}
      mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
      mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
      onViewportChange={viewport => setViewport(viewport)} onClick={clickMarker}>
      {marker.length === 2 && 
        <Marker latitude={marker[0]} longitude={marker[1]}>
          <Pin />
        </Marker>
      }      
      {/* {isLoaded &&
        <>
          {marker.map((marker, i) => {
            return (
              <Marker latitude={marker[0]} longitude={marker[1]}>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectPoint(marker);
                    setIndex(i);
                  }}
                >
                  <Pin />
                </button>
              </Marker>
            )
          })}

          {selectPoint ? (
            <Popup
              latitude={selectPoint.coordinates[0]}
              longitude={selectPoint.coordinates[1]}
              onClose={() => {
                setSelectPoint(null);
              }}
            >
              <div>
                {names[index]}
                                latitude: {selectPoint.coordinates[0]}
                                longitude: {selectPoint.coordinates[1]}
              </div>
            </Popup>
          ) : null}
        </>
      } */}
    </ReactMapGL>
  </div>
)
}

export default MapSearch; 
