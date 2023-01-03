import styles from "./Sidebar.module.scss";
import {
  MdGpsFixed,
  MdLocationPin,
  MdClose,
  MdKeyboardArrowRight,
  MdSearch
} from "react-icons/md";
import img from "../../assets/Shower.png";
import { useEffect, useState } from "react";

function Sidebar() {
  const [searchScreen, setSearchScreen] = useState(false);

  useEffect(() => {
    if(searchScreen && window.innerWidth <= 900) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [searchScreen])

  return (
    <aside className={styles.aside}>
      <header className={styles.aside__header}>
        <button
          className={styles.header__searchButton}
          onClick={() => setSearchScreen(true)}
        >
          Procurar por locais
        </button>
        <button className={styles.header__getMyLocationButton}>
          <MdGpsFixed />
        </button>
      </header>

      <main className={styles.aside__main}>
        <img src={img} className={styles.main__img} />
        <h1 className={styles.main__temperature}>
          15<span>ºC</span>
        </h1>
        <p className={styles.main__weather}>Chuva</p>
        <p className={styles.main__date}>Hoje • Sexta, 5 Jun</p>
        <p className={styles.main__local}>
          <MdLocationPin /> Salvador
        </p>
      </main>

      {searchScreen && (
        <div className={styles.aside__search}>
          <header className={styles.search__header}>
            <MdClose onClick={() => setSearchScreen(false)} />

            <div className={styles.search__form}>
              <div className={styles.search__input}>
                <MdSearch />
                <input type="search" placeholder="Digite o local" />
              </div>
              <button>Buscar</button>
            </div>
          </header>

          <main className={styles.search__main}>
            <div className={styles.search__option}>
              <p>London</p> <MdKeyboardArrowRight />
            </div>

            <div className={styles.search__option}>
              <p>Barcelona</p> <MdKeyboardArrowRight />
            </div>
          </main>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
