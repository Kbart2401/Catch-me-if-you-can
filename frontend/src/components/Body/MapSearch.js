import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import SearchPin from './SearchPin';
import { useSelector } from 'react-redux';
import './Map.css';
import * as turf from '@turf/turf'
const mbxTilesets = require('@mapbox/mapbox-sdk/services/tilesets');
const tilequeryClient = mbxTilesets({ accessToken: "pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2pjMDUzYnozMzVhMzBucDAzcXBhdXdjIn0.kEXpfO6zDjp9J4QXnwzVcA" })

//create map radius for search area 
function makeRadius(lngLatArray, radiusInMeters) {
  const point = turf.point(lngLatArray); 
  const buffered = turf.buffer(point, radiusInMeters, { units: 'meters' }); 
  return buffered; 
}

const MapSearch = () => {
  const [viewport, setViewport] = useState({});
  const [location, setLocation] = useState([]);
  const [coords, setCoords] = useState([]); 
  const [searchData, setSearchData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [radius, setRadius] = useState(0); 
  const [distance, setDistance] = useState(0)
  const [selectPoint, setSelectPoint] = useState(null);
  const [names, setName] = useState([]);
  const [index, setIndex] = useState('HEH');
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
  
  //click event for dropping marker on map && creating radius
  function clickLocation(event) {
    setLocation([event.lngLat[0], event.lngLat[1]]);
    const point = turf.point([event.lngLat[0], event.lngLat[1]]);
    const buffered = turf.buffer(point, 80, { units: 'kilometers' });
    const geojson = {
        type: 'FeatureCollection', 
        features: [
            {
              type: 'Feature', 
              geometry: {
                  type: 'Polygon',
                  coordinates: buffered.geometry.coordinates,            
              }
            }
        ]
    }
    setCoords(buffered.geometry.coordinates);
    setSearchData(geojson); 
    setIsLoaded(true);   
  };

  //click event for searching for runs 
  function findRuns() {
    if (createdRoutes) {
      var routemarkers = createdRoutes.map(route => {
        return route.route_coordinates[0]
      })
      // setMarkers(routemarkers)
    }
    console.log(routemarkers);
    let results = [];
    // const point = turf.point(location); 
    // console.log('POINT', point);
    // const poly = turf.polygon(coords); 
    // console.log('POLY', poly)
    // let result = (turf.inside(point, poly))
    // console.log(result); 
    routemarkers.forEach(marker => {
      const point = turf.point([marker[1], marker[0]]);
      console.log('HELLO', point); 
      const poly = turf.polygon(coords); 
      console.log('POLY', poly)
      console.log(turf.inside(point,poly))
      if (turf.inside(point, poly)) {
        console.log('HEY THERE')
        results.push(marker); 
      } 
      setMarkers(results); 
    })
  }

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
    <button onClick={findRuns}>
      Search for Runs
    </button>
    <ReactMapGL {...viewport}
      mapboxApiAccessToken={"pk.eyJ1Ijoicmh5c3A4OCIsImEiOiJja2o5Yjc2M3kyY21iMnhwZGc2YXVudHVpIn0.c6TOaQ-C4NsdK9uZJABS_g"}
      mapStyle={"mapbox://styles/rhysp88/ckj950pju3y8l1aqhpb58my9d/draft"}
      onViewportChange={viewport => setViewport(viewport)} onClick={clickLocation}>
      {location.length === 2 && 
        <Marker longitude={location[0]} latitude={location[1]}>
          <SearchPin />
        </Marker>
      }      
      {isLoaded &&
      <>
        <Source id="search-data" type="geojson" data={searchData}>
            <Layer id="search" type="fill" paint={{ 'fill-color': '#F1CF65', 'fill-opacity': 0.8 }} />
        </Source>
        {markers.map((marker) => {
          return (
            <Marker latitude={marker[0]} longitude={marker[1]}>
              <SearchPin />
            </Marker>
            )
        })}
      </>
      }
    </ReactMapGL>
  </div>
)
}

export default MapSearch; 
