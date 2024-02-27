import { useRef, useState } from "react";
import { useWeatherData } from "../fetchData/fetchDataContext";

function Home(){
    
    const [inputCity, setInputCity]= useState("");
    const {city, setCity, weatherData} = useWeatherData();
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
            <h3>I'm Home.</h3>
            <input type="text" placeholder="Enter city" ref={cityRef} value={inputCity} onChange={handleChange}/>
            <button onClick={handleSearch}> Search </button>
            { weatherData && <h2>Data for city found.</h2> }
        </>
    )
}

export default Home;