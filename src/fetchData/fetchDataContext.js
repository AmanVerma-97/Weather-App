//using Context API.
import { createContext, useContext, useEffect, useState} from "react";

const weatherContext=createContext();

function useWeatherData(){
   return useContext(weatherContext);
}

function FetchDataContext(props) {
    
    const [city,setCity] = useState("");
    const [weatherData,setWeatherData] = useState(null);
    
    const {children}=props; //all that use weatherContext.

    const fetchCurrentWeather= async()=>{
        const APIKey= "9f5b97bf1e84c5b6e30e95ea3d00cfa3";
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
        try {
            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Couldn't fetch city data");
            }
            const data= await response.json();
            console.log(data);
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
export default FetchDataContext;