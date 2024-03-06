//using Context API.
import { createContext, useContext, useEffect, useState} from "react";
// import image1 from '../images/clear-day-sky.jpg';
// import image2 from '../images/fog-night.jpg';
// import image3 from '../images/lightning-night-rain.jpg';
// import image4 from '../images/winter-snowfall.jpg';
// import image5 from '../images/clouds.jpg';
// import image6 from '../images/rainy-day.jpg';
// import image7 from '../images/fog-day.jpg';


const weatherContext=createContext();

function useWeatherData(){
   return useContext(weatherContext);
}

function FetchDataContext(props) {
    
    const [city,setCity] = useState("");
    const [weatherData,setWeatherData] = useState(null);
    const [aqiData, setAqiData]= useState(null);
    // const [background, setBackground]=useState(null);
    const [error,setError]=useState(false);
    const {children}=props; //all that use weatherContext.

    async function fetchCurrentAQI(city) {
        const myApiKey="Z/Kmj8smUiWWINArFoYPgg==HgmUNtkig4KMLSxX";
        const url = `https://api.api-ninjas.com/v1/airquality?city=${city}`;
        const headers = { 'X-Api-Key': myApiKey };
        const options = {
          method: 'GET',
          headers,
        };
      
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            setAqiData(null);
            throw new Error(`Error fetching aqi data: ${response.status}`);
          }
          const AQIData = await response.json();
        //   console.log("aqi",AQIData);
          setAqiData(AQIData);
          setError(false);
        } catch (error) {
        //   console.error('Error:', error);
          setError(true);
        }
      }

    const fetchCurrentWeather= async()=>{
        const APIKey= "9f5b97bf1e84c5b6e30e95ea3d00cfa3"; 
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

        try {
            const response= await fetch(url);
            if(!response.ok){
                setWeatherData(null);
                throw new Error("Couldn't fetch city data");
            }
            const data= await response.json();
            // console.log("weather:",data);
            setWeatherData(data); 
            setCity(data.name);
            setError(false);

        } catch (error) {
            // console.log(error);
            setError(true);
        }
    }

    useEffect(()=>{
        if(city){
            fetchCurrentWeather();
            fetchCurrentAQI(city.toUpperCase());
        }
        
    },[city]);

    // useEffect(()=>{ //to set background image according to main weather 
    //     if(weatherData){
    //         let url;
    //         const mainWeather = weatherData.weather[0].main;

    //         if(mainWeather==="Clear"){
    //             url=image1;
    //         }
    //         else if(mainWeather==="Thunderstorm"){
    //             url=image3;
    //         }
    //         else if(mainWeather==="Rain"){
    //             url=image6;
    //         }
    //         else if(mainWeather==="Snow"){
    //             url=image4;
    //         }
    //         else if(mainWeather==="Haze"){
    //             url=image2;
    //         }
    //         else if(mainWeather==="Clouds"){
    //             url=image5;
    //         }
    //         else{
    //             url=image7;
    //         }

    //         setBackground(url);
    //     }
    // },[weatherData]);

    return(
        <>
            {/* <h3> I'am fetchData.</h3> */}
            <weatherContext.Provider value={{aqiData, city, setCity, weatherData, error, setError, setWeatherData, setAqiData}}>
                {children}
            </weatherContext.Provider>
        </>
        
    );
}

export {useWeatherData};
export default FetchDataContext;