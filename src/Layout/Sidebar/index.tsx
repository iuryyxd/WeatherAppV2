import styles from "./Sidebar.module.scss";
import {
  MdGpsFixed,
  MdLocationPin,
  MdClose,
  MdKeyboardArrowRight,
  MdSearch,
} from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import {
  CitiesItemType,
  CitiesType,
  CurrentWeatherType,
} from "../../Types/mainTypes";
import axios from "axios";
import UnitsContext from "../../Contexts/UnitsContext";
import { toFahrenheit } from "../../Utils/convertCelsiusToFahrenheit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  sidebarSearchAnimation,
  sidebarAnimation,
} from "../../Animations/animations";

interface SidebarProps {
  currentWeather: CurrentWeatherType | undefined;
  getUserLocation: () => void;
  handleGetForecastWeather: (a: number, b: number) => void;
  handleGetCurrentWeather: (a: number, b: number, c: string) => void;
}

function Sidebar({
  currentWeather,
  getUserLocation,
  handleGetForecastWeather,
  handleGetCurrentWeather,
}: SidebarProps) {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const { unitType } = useContext(UnitsContext);

  const [searchScreen, setSearchScreen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState<CitiesType[]>([]);

  useEffect(() => {
    if (searchScreen && window.innerWidth <= 900) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchScreen]);

  const handleGetCities = () => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`;
    axios
      .get(url)
      .then(({ data }) => {
        const newArray: CitiesType[] = [];
        data.map((item: CitiesItemType) => {
          newArray.push({
            name: item.name,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
          });
        });

        setCities(newArray);
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.aside
      className={styles.aside}
      variants={sidebarAnimation}
      initial="initial"
      animate="animate"
      transition={{ duration: 1 }}
    >
      <header className={styles.aside__header}>
        <button
          className={styles.header__searchButton}
          onClick={() => setSearchScreen(true)}
        >
          Procurar por locais
        </button>
        <button
          className={styles.header__getMyLocationButton}
          onClick={getUserLocation}
        >
          <MdGpsFixed />
        </button>
      </header>

      <main className={styles.aside__main}>
        <img src={currentWeather?.weathericon} className={styles.main__img} />
        <h1 className={styles.main__temperature}>
          {unitType === "celsius"
            ? currentWeather?.temperature.metric
            : toFahrenheit(currentWeather?.temperature.metric)}
          <span>{unitType === "celsius" ? "ºC" : "ºF"}</span>
        </h1>
        <p className={styles.main__weather}>{currentWeather?.weathertext}</p>
        <p className={styles.main__date}>
          Hoje • {days[new Date().getDay()]}, {new Date().getDate()}{" "}
          {months[new Date().getMonth()]}
        </p>
        <p className={styles.main__local}>
          <MdLocationPin /> {currentWeather?.local}
        </p>
      </main>

      <AnimatePresence mode="wait">
        {searchScreen && (
          <motion.div
            className={styles.aside__search}
            variants={sidebarSearchAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <header className={styles.search__header}>
              <MdClose onClick={() => setSearchScreen(false)} />

              <div className={styles.search__form}>
                <div className={styles.search__input}>
                  <MdSearch />
                  <input
                    type="search"
                    placeholder="Digite o local"
                    onChange={(e) => setCityName(e.target.value)}
                  />
                </div>
                <button onClick={handleGetCities}>Buscar</button>
              </div>
            </header>

            <main className={styles.search__main}>
              {cities.map((city) => (
                <div
                  key={crypto.randomUUID()}
                  className={styles.search__option}
                  onClick={() => {
                    handleGetCurrentWeather(city.lat, city.lon, city.name);
                    handleGetForecastWeather(city.lat, city.lon);
                    setSearchScreen(false);
                    setCities([]);
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
                  }}
                >
                  <p>
                    {city.name}, {city.state}
                  </p>{" "}
                  <MdKeyboardArrowRight />
                </div>
              ))}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
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
    </motion.aside>
  );
}

export default Sidebar;
