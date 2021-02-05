import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactMapGL, { Marker, Layer, Source, Popup } from "react-map-gl";
import EndPin from './EndPin';
import StartPin from './StartPin';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import './CreateMap.css';
import { Typography } from '@material-ui/core';
const mapboxAPI = process.env.REACT_APP_MAPBOX
const mapboxSTYLE = process.env.REACT_APP_MAPBOX_STYLE

const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: mapboxAPI })

const CreateMap = () => {
  const [viewport, setViewport] = useState({});
  const [markers, setMarkers] = useState([])
  const [routeData, setRouteData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [distance, setDistance] = useState(0)
  const [selectPoint, setSelectPoint] = useState(null);
  const [names, setName] = useState([]);
  const [index, setIndex] = useState(null);
  const [routeName, setRouteName] = useState("");
  const [mapLoad, setMapLoad] = useState(false)
  const user = useSelector((state) => state.session.user)
  const history = useHistory();

  //establish viewport coordinates based on user location
  function success(pos) {
    const crd = pos.coords;
    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
      zoom: 16,
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

  //api request to the mapbox directions with SDK JS 
  useEffect(() => {
    if (markers.length >= 2) {
      const ways = markers.map(marker => {
        return {
          coordinates: [marker[0], marker[1]]
        }
      });
      directionsClient.getDirections({
        profile: 'walking',
        geometries: 'geojson',
        waypoints: ways
      })
        .send()
        .then(response => {
          const route = response.body.routes[0].geometry.coordinates;
          const dist = response.body.routes[0].distance;

          const waypoints = response.body.waypoints;
          let nameArr = [];
          for (let i = 0; i < waypoints.length; i++) {
            let name = waypoints[i].name;
            nameArr.push(name);
          }

          const geojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              }
            ]
          };
          //get marker set to route
          let arr = geojson.features[0].geometry.coordinates;
          let lonStart = arr[0][0];
          let latStart = arr[0][1];
          let lonEnd = arr[arr.length - 1][0];
          let latEnd = arr[arr.length - 1][1];

          // setMarkers([...markers.slice(0, markers.length-1), [lon, lat]])
          markers[0][0] = lonStart;
          markers[0][1] = latStart;
          markers[markers.length - 1][0] = lonEnd;
          markers[markers.length - 1][1] = latEnd;
          setName(nameArr);
          setDistance(dist.toFixed(0));
          setRouteData({ ...geojson });
          setIsLoaded(true);
        });
    }
  }, [markers, distance]);

  //click event for dropping marker on map
  function clickMarker(event) {
    setMarkers([...markers,
    [event.lngLat[0], event.lngLat[1]]
    ]);
  };

  //click event for resetting routes
  function clickReset() {
    setMarkers([]);
    setRouteData({});
    setIsLoaded(false);
    setDistance(0);
    setName([]);
  };

  //submit for saving route to database 
  async function clickSubmit() {
    if (!routeName) {
      alert("Please give your route a name!")
      return; 
    } 
    const res = await fetch('/api/routes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        routeCoordinates: markers,
        name: routeName,
        distance
      })
    })
    const data = await res.json();
    if (data) {
      console.log(data); 
      history.push({ pathname: '/my-routes', state: data });
    }
  };

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
          <h5 className='header-font create-route'>Create Route</h5>
          <div className={"mapcreate_container"}>
            <Typography style={{width: '65vw', paddingBottom: '10px', display: 'block'}}>Begin by clicking on the map to set your starting point. From there, you can click up to another 24 points onto the map
              to complete your route. Once you are happy with it, either click to submit your route or reset to refresh and start again. 
            </Typography>
            <div className={"mapcreate_panel"}>
              <p className={"panel__route"}>
                Route Name:
                <p>
                  <input type="text" value={routeName} onChange={(e) => setRouteName(e.target.value)} style={{ width: '100px', marginBottom: '0' }} />
                </p>
              </p>
              <p className={"panel__distance"}>Distance 
                <span style={{ 'font-size': 15, 'font-weight': 'normal' }}>(meters)</span>: {distance}
              </p>
              <button className={'panel__reset'} onClick={clickReset}>
                <p>Reset Route</p>
              </button>
              <button className={'panel__submit'} onClick={clickSubmit}>
                <p>Submit Route</p>
              </button>
            </div>
            <ReactMapGL {...viewport}
              mapboxApiAccessToken={mapboxAPI}
              mapStyle={mapboxSTYLE}
              onViewportChange={viewport => setViewport(viewport)} onClick={clickMarker}>
              {markers.length === 1 &&
                <Marker longitude={markers[0][0]} latitude={markers[0][1]} offsetTop={-20} offsetLeft={-5}>
                  <StartPin />
                </Marker>
              }
              {isLoaded &&
                <>
                  <Source id="route-data" type="geojson" data={routeData}>
                    <Layer id="route" type="line" paint={{ 'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75 }} />
                  </Source>
                  {markers.map((marker, i) => {
                    if (i === 0) {
                      return (
                        <Marker longitude={marker[0]}
                          latitude={marker[1]}
                          offsetTop={-20}
                          offsetLeft={-5}
                        >
                          <button className={"marker__button"} onClick={(e) => {
                            e.preventDefault();
                            setSelectPoint(marker);
                            setIndex(i);
                          }}>
                            <StartPin />
                          </button>
                        </Marker>
                      )
                    } else if (i === markers.length - 1) {
                      return (
                        <Marker longitude={marker[0]}
                          latitude={marker[1]}
                          offsetTop={-20}
                          offsetLeft={-5}
                        >
                          <button className={"marker__button"} onClick={(e) => {
                            e.preventDefault();
                            setSelectPoint(marker);
                            setIndex(i);
                          }}>
                            <EndPin />
                          </button>
                        </Marker>
                      )
                    }
                  })}

                  {selectPoint ? (
                    <Popup
                      longitude={selectPoint[0]}
                      latitude={selectPoint[1]}
                      onClose={() => {
                        setSelectPoint(null);
                      }}
                    >
                      <div>
                        <p className={'popup'}>{names[index] || "Unknown"}</p>
                        <p className={'popup'}>Longitude: {selectPoint[0]}</p>
                        <p className={'popup'}>Latitude: {selectPoint[1]}</p>
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

export default CreateMap; 
