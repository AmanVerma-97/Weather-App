
import './App.css';
import Home from './Home/Home';
// import fetchDataContext from './fetchData/fetchDataContext';
import { useWeatherData } from './fetchData/fetchDataContext';

function App() {

  const {background,weatherData, aqiData}= useWeatherData();
  
  return (
    <>
      {/* <h1>Learn React</h1>  */}
      {/* <fetchDataContext /> */}
      {
        weatherData && aqiData && 
        <div class="bg-cover bg-no-repeat font-medium font-serif h-dvh w-dvw" style={{ backgroundImage: `url(${background})` }}>
            <Home />
        </div>
      }

      {
        !weatherData && !aqiData && 
        <div class="bg-gradient-to-r from-cyan-500 via-teal-300 to-blue-500 font-medium font-serif h-dvh w-dvw">
            <Home />
        </div>
      }
      
      
    </>
        
  );
}

export default App;
