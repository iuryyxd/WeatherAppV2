import Card from "../../Components/Card";
import styles from "./Main.module.scss";
import imgTest from '../../assets/Sleet.png'

function Main() {
  return (
    <main className={styles.main}>
      <header className={styles.main__header}>
        <div className={styles.header__buttons}>
          <button className={styles.header__buttonCelsius}>ºC</button>
          <button className={styles.header__buttonFahrenheit}>ºF</button>
        </div>

        <div className={styles.header__cards}>
          <Card day="Tomorrow" img={imgTest} max="16ºC" min="11ºC" />
          <Card day="Sun, 7 Jun" img={imgTest} max="16ºC" min="11ºC" />
          <Card day="Mon, 8 Jun" img={imgTest} max="16ºC" min="11ºC" />
          <Card day="Tue, 9 Jun" img={imgTest} max="16ºC" min="11ºC" />
          <Card day="Wed, 10 Jun" img={imgTest} max="16ºC" min="11ºC" />
        </div>
      </header>

      <div className={styles.main__highlights}>
        <h1>Destaques de hoje</h1>

        <div>
          <div>
            <h1>Velocidade do vento</h1>
            <p>7<span>km/h</span></p>
          </div>

          <div>
            <h1>Umidade</h1>
            <p>84<span>%</span></p>
            <div>
              <div>
                <p>0</p><p>50</p><p>100</p>
              </div>
              <div></div>
              <p>%</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
