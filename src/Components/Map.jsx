import React,{useRef, useState,useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup,useMapEvents,} from 'react-leaflet';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import chestData from '../../chests';

function MapExample(props) {
    const [state,setState] =useState({
        lat: 41.06692773019345,
        lng: 28.98688290839576,
        zoom: 10,
        })

    let mainPointCoord = chestData.filter(chests => chests.name === props.selected).map(city => city.coords)[0]
    useEffect(() => {
      setState(prevCity => {
        return {
            ...prevCity,
            lat:mainPointCoord[0],
            lng:mainPointCoord[1],
            zoom:7,
        }
      })

    }, [mainPointCoord]); // Only re-run the effect 

    const closestPointstt=chestData.filter(chests => chests.name === props.selected).map(city => city.chests)
    const closestPoints=closestPointstt[0]    
    
    var myIcon = L.icon({
      iconUrl: 'src/images/location.png',
      iconSize: [30, 30],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],

    });

    const showClosestPoints = closestPoints.map(positions => {
      return (<Marker icon={myIcon} key={positions.key} position={[positions.lat,positions.lon]}>
                <Popup>Current location: <pre>{JSON.stringify([positions.lat,positions.lon], null, 2)}</pre></Popup>
              </Marker>)
    })

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const markerRef = useRef(null)

        function initMarker() {
            const marker = markerRef.current
            if (marker) {

                marker.openPopup()
            }
        }

        const map = useMapEvents({
          click(e) {
            setPosition(e.latlng)
            map.locate()
            initMarker()
          },
        })
        return position === null ? null : (
          <Marker ref={markerRef} position={position}>
            <Popup>Current location: <pre>{JSON.stringify(position, null, 2)}</pre></Popup>
          </Marker>
        )
      }
  return (
    <>
      <MapContainer className="map" center={[state.lat, state.lng]} zoom={state.zoom} ref={props.mapRef}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {props.query && showClosestPoints}
          
      </MapContainer>
    </>
     
  )
}
export default MapExample