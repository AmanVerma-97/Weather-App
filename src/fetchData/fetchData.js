//using Context API.
import { createContext, useContext, useEffect, useState} from "react";

const weatherContext=createContext();

function useWeatherData(){
    const value= useContext(weatherContext);
    return value;
}

function FetchData(props) {
    
    const[city,setCity]=useState("");
    const[weatherData,setWeatherData]=useState(null);
    const {children}=props; //all that use weatherContext.

    const fetchCurrentWeather= async()=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={37947d013f98ab57272fe2d0aadbdfdf}&units=metric`;
        try {
            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Couldn't fetch city data");
            }
            const data= await response.json();
            setWeatherData(data); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(city){
            fetchCurrentWeather();
        }
        
    },[city])

    return(
        <>
            {/* <h3> I'am fetchData.</h3> */}
            <weatherContext.Provider value={{city, setCity, weatherData}}>
                {children}
            </weatherContext.Provider>
        </>
        
    );
}

export {useWeatherData};
export default FetchData;