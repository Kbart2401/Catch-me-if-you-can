import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import SearchPin from './SearchPin';
import { useSelector } from 'react-redux';
import './Map.css';
import * as turf from '@turf/turf';
const mapboxAPI = process.env.REACT_APP_MAPBOX;
const mapboxSTYLE = process.env.REACT_APP_MAPBOX_STYLE;

const MapSearch = () => {
  const [viewport, setViewport] = useState({});
  //set circle coordinates
  const [point, setPoint] = useState([])
  const [polyCoords, setPolyCoords] = useState([]);
  //create source with circle radius layer
  const [searchData, setSearchData] = useState({});
  //after submission click of search runs
  const [isLoaded, setIsLoaded] = useState(false);
  //markers show runs in your area after filtering
  const [markers, setMarkers] = useState([]);
  //estalish pop-ups for marker selected
  const [selectPoint, setSelectPoint] = useState(null);
  const [index, setIndex] = useState(0);
  //set route details on popup
  const [radius, setRadius] = useState(1);
  const [distances, setDistances] = useState([]);
  const [names, setNames] = useState([]);
  const [createdRoutes, setCreatedRoutes] = useState('')

  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    async function getRoutes() {
      const res = await fetch('api/routes/')
      const routes = await res.json()
      setCreatedRoutes(routes)

    }
    getRoutes()
  }, [])

  //establish viewport coordinates based on user location
  function success(pos) {
    const crd = pos.coords;
    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
      zoom: 11,
      width: "50vw",
      height: "80vh",
    })
  };

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error);

  //click event for dropping marker on map && creating radius
  function clickLocation(event) {
    setMarkers([]);
    setNames([]);
    setDistances([]);
    const newPoint = turf.point([event.lngLat[0], event.lngLat[1]]);
    setPoint(newPoint);
    const buffered = turf.buffer(newPoint, radius, { units: 'kilometers' });
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
    setPolyCoords(buffered.geometry.coordinates);
    setSearchData(geojson);
    setIsLoaded(true);
  };

  //re-creating the radius size of the search when changing the number 
  useEffect(() => {
    if (point.length === 0) return; 
    setMarkers([]);
    setNames([]);
    setDistances([]);
    const buffered = turf.buffer(point, radius, { units: 'kilometers' });
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
    setPolyCoords(buffered.geometry.coordinates);
    setSearchData(geojson);
    setIsLoaded(true);
  }, [radius])

  //click event for searching for runs 
  function findRuns(e) {
    e.preventDefault();
    let routes = []
    if (createdRoutes) {
      let n = [];
      let d = [];
      createdRoutes.routes.forEach(route => {
        routes.push(route.route_coordinates[0]);
        n.push(route.name)
        d.push(route.distance)
      })
      setNames([...n]);
      setDistances([...d]);
    };

    let results = [];
    routes.forEach(marker => {
      const point = turf.point([marker[0], marker[1]]);
      const poly = turf.polygon(polyCoords);

      if (turf.inside(point, poly)) {
        results.push(marker);
      }
    })
    setMarkers(results);
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
      <form className={"panel"} onSubmit={findRuns}>
        <label className={"panel__distance"}>
          Search Radius <span style={{'font-size': 15, 'font-weight':'normal'}}>(km)</span>
        <input type="number" min="1" max="15" style={{width: '30px', 'margin-left': '5px'}} value={radius} onChange={e => setRadius(e.target.value)} />
        </label>
        <button className={'panel__search'} onClick={findRuns}>
          Search for Runs
        </button>
      </form>
      <ReactMapGL {...viewport}
        mapboxApiAccessToken={mapboxAPI}
        mapStyle={mapboxSTYLE}
        onViewportChange={viewport => setViewport(viewport)} onClick={clickLocation}>
        {isLoaded &&
          <>
            <Source id="search-data" type="geojson" data={searchData}>
              <Layer id="search" type="fill" paint={{ 'fill-color': '#F1CF65', 'fill-opacity': 0.8 }} />
            </Source>
            {markers.map((marker, i) => {
              return (
                <Marker longitude={marker[0]} latitude={marker[1]} >
                  <button className={"marker__button"}
                    onClick={e => {
                      e.preventDefault();
                      setSelectPoint(marker);
                      setIndex(i);
                    }}
                  >
                    <SearchPin />
                  </button>
                </Marker>
              )
            })}
            {selectPoint ? (
              <Popup
                latitude={selectPoint[1]}
                longitude={selectPoint[0]}
                onClose={() => {
                  setSelectPoint(null);
                }}
              >
                <div>
                  <p className={'popup'}><span style={{'font-weight':'bold'}}>Route name:</span> {names[index]}</p>
                  <p className={'popup'}><span style={{'font-weight':'bold'}}>Distance:</span>{distances[index]}</p>
                </div>
              </Popup>
            ) : null}
          </>
        }
      </ReactMapGL>
    </div>
  )
}

export default MapSearch; 
