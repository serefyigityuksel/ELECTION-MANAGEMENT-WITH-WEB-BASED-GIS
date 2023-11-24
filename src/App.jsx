// import MapExample from "./Components/Map"
import {useState,useRef} from "react"
import MapExample from "./Components/Map"
import SideBar from "./Components/SideBar"
import "./index.css"
import chestData from "../chests"

function App() {
  const [query,setQuery]=useState(false)
  const [selected, setSelected] = useState("Hatay")

    const mapRef = useRef(null); 
    
    function changeZoom(lat,lng,zoom){
      mapRef.current.flyTo([lat, lng], zoom);
    }


  let mainPointCoord = chestData.filter(chests => chests.name === selected).map(city => city.coords)[0]

  function handleClick(){
    setQuery(true)
    console.log(selected)
    changeZoom(mainPointCoord[0],mainPointCoord[1],10)
  }
  return (
    <>
      <div className="app">
        <SideBar query={query} handleClick={handleClick} chestData={chestData} setSelected={setSelected} selected={selected}/>
        <MapExample query={query} selected={selected} mapRef={mapRef}/> 
      </div>
      
    </>
  )
}

export default App
