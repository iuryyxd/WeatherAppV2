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
        <h1 className={styles.highlights__title}>Destaques de hoje</h1>

        <div className={styles.highlights__grid}>
          <div className={styles.grid__wind}>
            <h1>Velocidade do vento</h1>
            <p>7<span>km/h</span></p>
            <p>ou 4,3mph</p>
          </div>

          <div className={styles.grid__humidity}>
            <h1>Umidade</h1>
            <p className={styles.humidity__percentage}>84<span>%</span></p>
            <div className={styles.humidity__bar}>
              <div className={styles.bar__numbers}>
                <p>0</p><p>50</p><p>100</p>
              </div>
              <div className={styles.bar__slide}><div></div></div>
              <p className={styles.bar__percentage}>%</p>
            </div>
          </div>

          <div className={styles.grid__visibility}>
            <h1>Visibilidade</h1>
            <p>10<span>km</span></p>
          </div>

          <div className={styles.grid__airPressure}>
            <h1>Pressão do ar</h1>
            <p>998<span>mb</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
