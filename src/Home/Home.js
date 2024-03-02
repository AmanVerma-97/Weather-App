import { useRef, useState } from "react";
import { useWeatherData } from "../fetchData/fetchDataContext";

function Home(){
    
    const [inputCity, setInputCity]= useState("");
    const {city, setCity, weatherData, aqiData} = useWeatherData();
    const cityRef=useRef("");

    function handleChange(event){
        setInputCity(event.target.value);
    }

    function handleSearch(){
        setCity(inputCity);
        setInputCity("");
        cityRef.current.focus();
    }

    return(
        <>
            
            <input type="text" placeholder="Enter city" ref={cityRef} value={inputCity} onChange={handleChange}/>
            <button onClick={handleSearch}> Search </button>
            { weatherData && <h2>Data for city weather found.</h2> }
            {aqiData && <h2>Data for city AQI found.</h2> }
        </>
    )
}

export default Home;