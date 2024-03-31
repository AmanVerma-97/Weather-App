import { useEffect, useRef, useState } from "react";
import { useWeatherData } from "../fetchData/fetchDataContext";
import { Link } from "react-router-dom";

function Home(){
    
    const [inputCity, setInputCity]= useState("");
    const {setCity, weatherData, aqiData, error} = useWeatherData();
    const [aqiColor, setAqiColor]= useState(null);
    const [theme, setTheme]=useState(null);
    const cityRef=useRef("");

    //to switch between light and dark themes

    // 1.On initial render theme will be same as theme on user's computer
     //1 A. TO SWITCH TO USER'S THEME WHEN THEY CHANGE IT
    // useEffect(()=>{
    //     if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    //         setTheme("dark");
    //     }
    //     else{
    //         setTheme("light");
    //     }
    // },[])
     
    // 2. To switch themes
    useEffect(()=>{
        if(theme==="dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    },[theme])

   
    const handleThemeSwitch=()=>{
        setTheme(theme==="dark"? "light" : "dark"); 
    }

    //Set city name for API fetch.

    function handleChange(event){
        setInputCity(event.target.value);
    }

    function handleSearch(){
        setCity(inputCity);
        setInputCity("");
        cityRef.current.focus();
    }

    //Convert time received from API in local time for that zone.
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


      //set AQi color to show level of AQI
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
        { error ? <Link to="error"> <button class="bg-slate-600 text-yellow-500 font-bold p-2 rounded-md block m-auto mt-20">
            <span class="text-red-500">Error.</span> Click to see details </button> </Link> :

        // Outermost div
        <div id="outermost" class="bg-gradient-to-r from-cyan-500 via-teal-300 to-blue-500 font-medium font-serif h-screen w-dvw
                    dark:bg-gradient-to-r dark:from-slate-950 dark:via-grey-800 dark:to-slate-900 dark:text-white">

            {/* Search bar */}
            <div class="m-auto p-3 flex flex-col md:flex-row items-center gap-4 w-fit bg-transparent shadow-lg shadow-gray-900/75
                        dark:shadow-lg dark:shadow-slate-100/50 mb-8">
                <div>
                    <input type="text" class="bg-blue-200 p-2 placeholder-slate-500 font rounded w-60 md:w-80 text-center
                     dark:text-black dark:bg-slate-200 dark:border-gray-500 dark:hover:border-blue-300 dark:border-2" 
                    placeholder="Enter city" ref={cityRef} value={inputCity} onChange={handleChange} required/>
                    
                </div>
                <div>
                    <button onClick={handleSearch} 
                    class="bg-slate-400 w-60 md:w-auto h-auto rounded p-2
                     hover:bg-slate-700 hover:text-white hover:outline-blue-300 hover:outline-2 hover:outline
                     dark:text-black"> Search </button>
                </div>
            </div>

            {/* Light Mode/ Dark Mode */}
            <div class="absolute top-4 right-6 h-auto w-6 border-2 border-cyan-700 dark:border-gray-500 rounded-md flex justify-center">
                <button class="bg-transparent m-auto" onClick={handleThemeSwitch}>
                    {theme==="dark"? <img src="https://cdn-icons-png.flaticon.com/128/3073/3073665.png" alt="light-mode" class="h-4 w-4 inline"/>
                                   : <img src="https://cdn-icons-png.flaticon.com/128/1812/1812660.png" alt="dark-mode" class="h-4 w-4 inline"/> }
                </button>
            </div>

            {/* Displaying data if API fetch success */}
            { weatherData && aqiData && 
            <div class="bg-transparent h-auto w-11/12 m-auto  mt-2 flex flex-col items-center gap-6 shadow-xl shadow-gray-900/50
            md:w-6/12  xl:w-4/12 md:m-auto md:mt-12 dark:shadow-lg dark:shadow-slate-100/50">
                <div> <img src="https://cdn-icons-png.flaticon.com/128/562/562511.png" alt="city" class="inline h-8 w-8"/> 
                    <h3 class="font-extrabold inline"> {weatherData.name}</h3></div>

                <div> <h1 class="font-extrabold text-4xl"> {weatherData.main.temp} &deg;C </h1> </div>

                <div><h3 class="font-extrabold"> {weatherData.weather[0].main} </h3></div>

                <div class="font-bold text-lg"> <img src="https://cdn-icons-png.flaticon.com/128/3778/3778496.png" alt="mask" class="inline h-8 w-8"/> 
                AQI <span id="aqi" className={aqiColor}> {aqiData.overall_aqi} </span> </div>
            </div>}

            {weatherData && aqiData && 
            <div class="bg-transparent h-auto w-11/12 mt-8 m-auto flex flex-wrap gap-4 justify-between items-center p-2 font-mono shadow-xl shadow-gray-900/50 
            md:flex-row md:w-10/12 xl:w-8/12 md:m-auto md:min-h-24 md:mt-12 dark:shadow-lg dark:shadow-slate-100/50">
                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img src="https://cdn-icons-png.flaticon.com/128/4851/4851827.png" class="h-8 w-8 inline" alt="min-temp"/> 
                {weatherData.main.temp_min} &deg;C</div>

                <div class="flex gap-2 w-1/3 sm:w-1/4 md:w-auto"> <img  src="https://cdn-icons-png.flaticon.com/128/3236/3236862.png" class="h-8 w-8 inline" alt="max-temp"/> 
                {weatherData.main.temp_max} &deg;C </div>

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