import Card from "../../Components/Card";
import styles from "./Main.module.scss";
import { CurrentWeatherType, ForecastWeatherType } from "../../Types/mainTypes";
import { useContext } from "react";
import UnitsContext from "../../Contexts/UnitsContext";
import { toFahrenheit } from "../../Utils/convertCelsiusToFahrenheit";

interface MainProps {
  currentWeather: CurrentWeatherType | undefined;
  forecastWeather: ForecastWeatherType[];
}

function Main({ currentWeather, forecastWeather }: MainProps) {
  const { unitType, setUnitType } = useContext(UnitsContext);

  return (
    <main className={styles.main}>
      <header className={styles.main__header}>
        <div className={styles.header__buttons}>
          <button
            className={`${styles.header__buttonCelsius} ${
              unitType && styles[unitType]
            }`}
            onClick={() => setUnitType("celsius")}
          >
            ºC
          </button>
          <button
            className={`${styles.header__buttonFahrenheit} ${
              unitType && styles[unitType]
            }`}
            onClick={() => setUnitType("fahrenheit")}
          >
            ºF
          </button>
        </div>

        <div className={styles.header__cards}>
          {forecastWeather &&
            forecastWeather.map((item, index) => (
              <Card
                key={crypto.randomUUID()}
                day={index === 0 ? "Amanhã" : item.day}
                img={item.icon}
                max={
                  unitType === "celsius"
                    ? `${item.temperature.maximum.metric}ºC`
                    : `${toFahrenheit(item.temperature.maximum.metric)}ºF`
                }
                min={
                  unitType === "celsius"
                    ? `${item.temperature.minimum.metric}ºC`
                    : `${toFahrenheit(item.temperature.minimum.metric)}ºF`
                }
              />
            ))}
        </div>
      </header>

      <div className={styles.main__highlights}>
        <h1 className={styles.highlights__title}>Destaques de hoje</h1>

        <div className={styles.highlights__grid}>
          <div className={styles.grid__wind}>
            <h1>Velocidade do vento</h1>
            <p>
              {currentWeather?.windSpeed.metric}
              <span>km/h</span>
            </p>
            <p>
              ou{" "}
              {currentWeather &&
                Math.round(currentWeather.windSpeed.metric / 1.609)}
              mi/h
            </p>
          </div>

          <div className={styles.grid__humidity}>
            <h1>Umidade</h1>
            <p className={styles.humidity__percentage}>
              {currentWeather?.humidity}
              <span>%</span>
            </p>
            <div className={styles.humidity__bar}>
              <div className={styles.bar__numbers}>
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className={styles.bar__slide}>
                <div style={{ width: `${currentWeather?.humidity}%` }}></div>
              </div>
              <p className={styles.bar__percentage}>%</p>
            </div>
          </div>

          <div className={styles.grid__visibility}>
            <h1>Visibilidade</h1>
            <p>
              {currentWeather?.visibility}
              <span>km</span>
            </p>
          </div>

          <div className={styles.grid__airPressure}>
            <h1>Pressão do ar</h1>
            <p>
              {currentWeather?.pressure}
              <span>mb</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
