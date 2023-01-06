import axios from "axios";
import Main from "./Layout/Main";
import Sidebar from "./Layout/Sidebar";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import {
  CurrentWeatherType,
  ForecastWeatherDataType,
  ForecastWeatherType,
  PositionType,
} from "./Types/mainTypes";
import { convertIcon } from "./Utils/convertIconToImage";
import { convertDateToString } from "./Utils/convertDateToString";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnitsContext from "./Contexts/UnitsContext";

function App() {
  const forecastIndexes = [4, 12, 20, 28, 36];

  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>();
  const [forecastWeather, setForecastWeather] = useState<ForecastWeatherType[]>(
    []
  );
  const [unitType, setUnitType] = useState<string | null>("celsius");

  const handleGetCurrentWeather = (lat: number, lon: number, city?: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;
    axios
      .get(url)
      .then(({ data }) => {
        setCurrentWeather({
          local: city ? city : data.name,
          temperature: {
            metric: Math.round(data.main.temp),
          },
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          visibility: data.visibility,
          windSpeed: {
            metric: data.wind.speed,
          },
          weathericon: convertIcon(data.weather[0].icon),
          weathertext: data.weather[0].description,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleGetForecastWeather = (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;
    axios
      .get(url)
      .then(({ data }) => {
        const newArray: ForecastWeatherType[] = [];

        data.list.map((item: ForecastWeatherDataType, itemIndex: number) => {
          if (forecastIndexes.includes(itemIndex)) {
            newArray.push({
              day: convertDateToString(item.dt_txt),
              temperature: {
                minimum: {
                  metric: Math.round(item.main.temp_max),
                },
                maximum: {
                  metric: Math.round(item.main.temp_min),
                },
              },
              icon: convertIcon(item.weather[0].icon),
            });
          }
        });

        setForecastWeather(newArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetCurrentWeather(-12.9822499, -38.4812772, "Salvador");
    handleGetForecastWeather(-12.9822499, -38.4812772);
  }, []);

  const getUserLocation = () => {
    const successCallback = (position: PositionType) => {
      handleGetCurrentWeather(
        position.coords.latitude,
        position.coords.longitude
      );
      handleGetForecastWeather(
        position.coords.latitude,
        position.coords.longitude
      );

      toast.success("Informações obtidas com sucesso!", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };

    const errorCallback = () => {
      toast.error("Não foi possível obter informações do seu local.", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <div className={styles.app}>
      <UnitsContext.Provider value={{ unitType, setUnitType }}>
        <Sidebar
          currentWeather={currentWeather}
          getUserLocation={getUserLocation}
          handleGetForecastWeather={handleGetForecastWeather}
          handleGetCurrentWeather={handleGetCurrentWeather}
        />
        <Main
          currentWeather={currentWeather}
          forecastWeather={forecastWeather}
        />

        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </UnitsContext.Provider>
    </div>
  );
}

export default App;
