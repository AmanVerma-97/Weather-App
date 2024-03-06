import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useWeatherData } from '../fetchData/fetchDataContext';

function ErrorPage() {
  const {setError, setWeatherData, setAqiData} = useWeatherData();

  useEffect(()=>{
    setError(false);
    setAqiData(null);
    setWeatherData(null);
  },[])
  
  return (
    <div class="w-10/12 h-4/5 sm:w-6/12 sm:h-4/5 m-auto flex items-center justify-center flex-col flex-wrap bg-slate-800 text-white gap-8 mt-12 p-4">
        <h1 class="font-extrabold text-4xl text-center">An Error occured!!</h1>
        <p class="font-bold">City data does not exist.</p>
        <img src='https://cdn-icons-png.flaticon.com/128/3855/3855833.png' class="h-22 w-22" alt='error'/>
        <Link to={'/'}> <button class="bg-slate-600 text-yellow-500 font-bold p-2 rounded-md"> BACK </button> </Link>
        
    </div>
  )
}

export default ErrorPage;