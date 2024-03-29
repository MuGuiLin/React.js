import logo from '../assets/logo.svg';
import './App.css';

import Todolist from '../components/Todolist';
import Tab from '../components/Tab';
import Communication from '../components/Communication';
import LifeCycle from '../components/LifeCycle';

function App() {
  return (
    <section className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <Todolist></Todolist>
        <Tab></Tab>
        <Communication></Communication>
        <LifeCycle></LifeCycle>
      </main>
    </section>
  );
}

export default App;
