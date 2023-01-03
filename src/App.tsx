import Main from "./Layout/Main";
import Sidebar from "./Layout/Sidebar";
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
