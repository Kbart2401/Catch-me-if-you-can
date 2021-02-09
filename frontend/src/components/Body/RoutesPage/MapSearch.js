import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import { useHistory } from 'react-router-dom';
import SearchPin from './SearchPin';
import { useSelector } from 'react-redux';
import './MapSearch.css';
import * as turf from '@turf/turf';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { Typography } from '@material-ui/core';
const mapboxAPI = process.env.REACT_APP_MAPBOX;
const mapboxSTYLE = process.env.REACT_APP_MAPBOX_STYLE;

const MapSearch = () => {
  const user = useSelector((state) => state.session.user)
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
  const [ids, setIds] = useState([]);
  const [createdRoutes, setCreatedRoutes] = useState('')
  const [mapLoad, setMapLoad] = useState(false);

  useEffect(() => {
    (async function getRoutes() {
      const res = await fetch('api/routes/')
      const routes = await res.json()
      setCreatedRoutes(routes);
    })()
  }, [])

  //establish viewport coordinates based on user location
  function success(pos) {
    const crd = pos.coords;
    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
      zoom: 11,
      width: "65vw",
      height: "65vh",
    })
    setMapLoad(true)
  };

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (user && user.email === 'demo@aa.io') {
      success({ coords: { latitude: 39.9763752, longitude: -82.9238448 } })
    }
    else navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //click event for dropping marker on map && creating radius
  function clickLocation(event) {
    setSelectPoint(null)
    setMarkers([]);
    setNames([]);
    setDistances([]);
    setIds([]);
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
    setIds([]);
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
    if (point.length === 0) return;
    let foundRoutes = []
    if (createdRoutes) {
      let n = [];
      let d = [];
      let i = []; 
      Object.keys(createdRoutes.routes).forEach(key => {
        foundRoutes.push(createdRoutes.routes[key].route_coordinates[0]);
        n.push(createdRoutes.routes[key].name)
        d.push(createdRoutes.routes[key].distance)
        i.push(createdRoutes.routes[key].id); 
      })
      setNames([...n]);
      setDistances([...d]);
      setIds([...i]);
    };

    let results = [];
    foundRoutes.forEach(marker => {
      const point = turf.point([marker[0], marker[1]]);
      const poly = turf.polygon(polyCoords);

      if (turf.inside(point, poly)) {
        results.push(marker);
      }
    })
    setMarkers(results);
  }

  return (
    <>
      {!mapLoad &&
        <>
          <div style={{
            display: 'flex', backgroundColor: '#EBF8FF', position: 'absolute',
            top: '50%', right: '50%', marginRight: '-50px'
          }}>
            <ClimbingBoxLoader size='50px' color='#3f51b5' />
          </div>
        </>}
      { mapLoad &&
        <>
          <h5 className='header-font create-route'>Find a Route</h5>
          <Typography style={{maxWidth: '65vw', maxWidth: '1000px', minWidth: '800px', paddingBottom: '10px'}}>Choose a location on the map, set the search radius and then press the
          search button to find all the registered routes in the area.  
          </Typography>
          <div className={"map_container"}>
            <form className={"panel"} onSubmit={findRuns}>
              <label className={"panel__distance"}>
                Search Radius: 
                <input type="number" min="1" max="15" style={{ width: '30px', 'margin-left': '5px' }} value={radius} onChange={e => setRadius(e.target.value)} />
                <span style={{ 'font-size': 15, 'font-weight': 'normal' }}> km</span>
              </label>
              <button className={'panel__search'} onClick={findRuns}>
                Search for Routes
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
                    tipSize={8}
                    offsetLeft={6}
                    onClose={() => {
                      setSelectPoint(null);
                    }}
                    closeOnClick={false}
                  >
                <div>
                  <p className={'popup'}><span style={{'font-weight':'bold'}}>Route name:</span> {names[index]}</p>
                  <p className={'popup'}><span style={{'font-weight':'bold'}}>Distance:</span> {distances[index].toFixed(0)} m</p>
                  <p className={'popup'}>
                    <a href={`/route/${ids[index]}`} style={{'font-weight':'bold','textDecoration':'none', 'color':'black'}}>
                      Click here to check out this route
                    </a>
                        </p>
                      </div>
                    </Popup>
                  ) : null}
                </>
              }
            </ReactMapGL>
          </div>
        </>
      }
    </>
  )
}

export default MapSearch; 
