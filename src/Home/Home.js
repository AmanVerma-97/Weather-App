import { useEffect, useRef, useState } from "react";
import { useWeatherData } from "../fetchData/fetchDataContext";


function Home(){
    
    const [inputCity, setInputCity]= useState("");
    const {city, setCity, weatherData, aqiData} = useWeatherData();
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
            <div class="m-auto p-6 flex flex-col md:flex-row items-center gap-4 w-fit bg-slate-50">
                <div>
                    <input type="text" class="bg-blue-200 p-2 placeholder-slate-500 font rounded min-w-60 w-80" 
                    placeholder="Enter city" ref={cityRef} value={inputCity} onChange={handleChange}/>
                    
                </div>
                <div>
                    <button onClick={handleSearch} 
                    class="bg-slate-400 w-80 sm:w-60 md:w-auto h-auto rounded p-2 hover:bg-slate-700 hover:text-white "> Search </button>
                </div>
            
            </div>
            
            { weatherData && aqiData && <div class="bg-slate-400 h-auto w-full md:w-6/12 md:m-auto md:mt-2 mt-2 flex flex-col items-center gap-6">
                <div> <h3>{city}</h3></div>

                <div> <h1 class="font-extrabold text-4xl text"> {weatherData.main.temp} &deg;C </h1> </div>

                <div><h3> {weatherData.weather[0].main} </h3></div>

                <div class="font-bold text-lg"> AQI <span id="aqi" className={aqiColor}> {aqiData.overall_aqi} </span> </div>
            </div>}

            {weatherData && aqiData && 
            <div class="bg-slate-400 h-auto w-full mt-2 flex flex-col md:flex-row md:w-6/12 md:m-auto md:mt-2  gap-6 justify-between items-center px-2 font-mono">
                <div class="flex gap-2"> <img src="https://cdn-icons-png.flaticon.com/128/4851/4851827.png" class="h-8 w-8 inline" alt="min-temp"/> 
                {weatherData.main.temp_min} &deg;C</div>

                <div class="flex gap-2"> <img  src="https://cdn-icons-png.flaticon.com/128/3236/3236862.png" class="h-8 w-8 inline" alt="max-temp"/> 
                {weatherData.main.temp_max} &deg;C</div>

                <div class="flex gap-2"> <img src="https://cdn-icons-png.flaticon.com/128/3175/3175147.png" class="h-8 w-8 inline" alt="sunrise"/>
                {convertTimestamp(weatherData.sys.sunrise, weatherData.timezone)} </div>

                <div class="flex gap-2"> <img src="https://cdn-icons-png.flaticon.com/128/4814/4814444.png" class="h-8 w-8 inline" alt="sunset"/> 
                {convertTimestamp(weatherData.sys.sunset, weatherData.timezone)} </div>

            </div>}
        
            {/* { weatherData && <h2>Data for city weather found.</h2> }
            {aqiData && <h2>Data for city AQI found.</h2> }
            {!weatherData && !aqiData && city && <h2>{city} data not found!</h2>} */}
        </>
    )
}

export default Home;