import { useEffect, useRef, useState } from "react";
import { useWeatherData } from "../fetchData/fetchDataContext";
import { Link } from "react-router-dom";

function Home(){
    
    const [inputCity, setInputCity]= useState("");
    const {city, setCity, weatherData, aqiData, error} = useWeatherData();
    const [aqiColor, setAqiColor]= useState(null);
    const cityRef=useRef("");

    function handleChange(event){
        setInputCity(event.target.value);
    }

    function handleSearch(){
        setCity(inputCity);
        setInputCity("");
        cityRef.current.focus();
    }

    function convertTimestamp(timestamp,timezone) {
        const sunDate= new Date((timestamp+timezone)*1000 );
        let sunHours=sunDate.getHours();
        let sunMinutes=sunDate.getMinutes();
        if(sunMinutes>=30){
            sunMinutes-=30;
            if(sunHours>=6){
                sunHours-=5;
            }
            else{
                sunHours+=17;
            }
            
        }
        else{
            sunMinutes+=30;
            if(sunHours>=6){
                sunHours-=6;
            }
            else{
                sunHours+=18;
            }
        }
        sunHours = sunHours.toString().padStart(2, '0');
        sunMinutes = sunMinutes.toString().padStart(2, '0');
        return (`${sunHours}:${sunMinutes}`);
      }

      useEffect(()=>{

        if(aqiData){
            let colorClass;
            if(aqiData.overall_aqi<50){
                colorClass="text-green-800";
            }
            else if(aqiData.overall_aqi<100){
                colorClass="text-amber-600";
            }
            else if(aqiData.overall_aqi<150){
                colorClass="text-orange-700";
            }
            else if(aqiData.overall_aqi<200){
                colorClass="text-red-500";
            }
            else if(aqiData.overall_aqi<300){
                colorClass="text-indigo-600";
            }
            else{
                colorClass="text-purple-800";
            }
            setAqiColor(colorClass);
        }
        
      },[aqiData])
      

    return(
        <>
        {error ? <Link to={'/err'}> <button class="bg-slate-600 text-yellow-500 font-bold p-2 rounded-md block m-auto mt-20">
            <span class="text-red-500">Error.</span> Click to see details </button> </Link> :

        // Outermost div
        <div id="outermost" class="bg-gradient-to-r from-cyan-500 via-teal-300 to-blue-500 font-medium font-serif h-screen w-dvw
                    dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 dark:to-slate-900 dark:text-white">

                        {/* Search bar */}
            <div class="m-auto p-3 flex flex-col md:flex-row items-center gap-4 w-fit bg-transparent shadow-lg">
                <div>
                    <input type="text" class="bg-blue-200 p-2 placeholder-slate-500 font rounded min-w-60 w-80 text-center" 
                    placeholder="Enter city" ref={cityRef} value={inputCity} onChange={handleChange} required/>
                    
                </div>
                <div>
                    <button onClick={handleSearch} 
                    class="bg-slate-400 w-80 sm:w-60 md:w-auto h-auto rounded p-2
                     hover:bg-slate-700 hover:text-white hover:outline-blue-300 hover:outline-2 hover:outline"> Search </button>
                </div>
            
            </div>

            {/* Displaying data if API fetch success */}
            { weatherData && aqiData && 
            <div class="bg-transparent h-auto w-11/12 m-auto  mt-2 flex flex-col items-center gap-6 shadow-xl
            md:w-6/12 md:m-auto md:mt-12">
                <div> <img src="https://cdn-icons-png.flaticon.com/128/562/562511.png" alt="city" class="inline h-8 w-8"/> 
                    <h3 class="font-extrabold inline"> {city}</h3></div>

                <div> <h1 class="font-extrabold text-4xl"> {weatherData.main.temp} &deg;C </h1> </div>

                <div><h3 class="font-extrabold"> {weatherData.weather[0].main} </h3></div>

                <div class="font-bold text-lg"> <img src="https://cdn-icons-png.flaticon.com/128/4747/4747661.png" alt="mask" class="inline h-8 w-8"/> 
                AQI <span id="aqi" className={aqiColor}> {aqiData.overall_aqi} </span> </div>
            </div>}

            {weatherData && aqiData && 
            <div class="bg-transparent h-auto w-11/12 mt-8 m-auto flex flex-wrap gap-4 justify-between items-center p-2 font-mono shadow-xl 
            md:flex-row md:w-10/12 md:m-auto md:mt-12">
                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/4851/4851827.png" class="h-8 w-8 inline" alt="min-temp"/> 
                {weatherData.main.temp_min} &deg;C</div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img  src="https://cdn-icons-png.flaticon.com/128/3236/3236862.png" class="h-8 w-8 inline" alt="max-temp"/> 
                {weatherData.main.temp_max} &deg;C</div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/3175/3175147.png" class="h-8 w-8 inline" alt="sunrise"/>
                {convertTimestamp(weatherData.sys.sunrise, weatherData.timezone)} </div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/4814/4814444.png" class="h-8 w-8 inline" alt="sunset"/> 
                {convertTimestamp(weatherData.sys.sunset, weatherData.timezone)} </div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/8923/8923690.png" class="h-8 w-8 inline" alt="sunset"/> 
                {weatherData.main.humidity}% </div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/3579/3579552.png" class="h-8 w-8 inline" alt="sunset"/> 
                {weatherData.wind.speed} Km/Hr </div>

            </div>}
        </div>
        }
        
        </>
    )
}

export default Home;