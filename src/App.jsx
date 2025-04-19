import React, { useEffect, useState } from "react";
import "./index.css"; // or wherever your Tailwind CSS is
import Timelocation from "./Component/Timelocation";
import TopButton from "./Component/TopButton";
import Input from "./Component/Input";
import Temperaturedetail from "./Component/Temperaturedetail";
import Forecast from "./Component/Forecast";
import getformatedweatherdata from "./Component/Services/WeatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultt from "./assets/default.jpg";
import clear from "./assets/clear.jpg";
import mist from "./assets/mist.jpg";
import rain from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import dizzle from "./assets/dizzle.jpg";
import cloud from "./assets/cloudy.jpg";
import thunder from "./assets/thunderstrome.jpg";

function capitalizefirstletter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: " " });
  const [units, setunits] = useState("metric");
  const [weather, setweather] = useState(null);
  const [backgroundimage, setbackgroundimg] = useState(defaultt);

  const getweather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizefirstletter(cityName)}`);
    await getformatedweatherdata({ ...query, units }).then((data) => {
      toast.success(`fetched weather data for ${data.name} , ${data.country}`);
      setweather(data);
      console.log(data);
    });
  };

  useEffect(() => {
    getweather();
  }, [query, units]);

 

  

  useEffect(() => {
    if (!weather) return;
    setbackgroundimg(defaultt);
    let bgUrl = " ";

    switch (weather.details) {
      case "Clear":
        bgUrl = clear;
        break;

      case "Rain":
        bgUrl = rain;
        break;

      case "Snow":
        bgUrl = snow;
        break;

      case "Clouds":
        bgUrl = cloud;
        break;

      case "Strome":
        bgUrl = thunder;
        break;

      case "Mist":
        bgUrl = mist;
        break;

      case "Drizzle":
        bgUrl = dizzle;
        break;

      default:
        bgUrl = defaultt;
        break;
    }

    setbackgroundimg(bgUrl);
  }, [weather]);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minheight: "100vh",
        padding: "2rem",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div
        className={`mx-auto max-w-screen-lg   border-2 border-gray-50 backdrop-blur-lg border-spacing-2 lg:py-4 py-1
         lg:px-24 px-10 shadow-gray-500 bg-white/30 rounded-lg`}>
        <TopButton setQuery={setQuery} currentQuery={query} />
        <Input setQuery={setQuery} setunits={setunits} units={units} />
        {weather && (
          <>
            <Timelocation weather={weather} />
            <Temperaturedetail weather={weather} units={units} />
            <Forecast title="3 hour step forecast" data={weather.hourly} />
            <Forecast title="daily forecast" data={weather.daily} />
          </>
        )}
        <ToastContainer
          autoClose={2500}
          hideProgressBar={true}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default App;
