import React from 'react';
import Header from './components/Header';
import FormLogin from './components/FormLogin';
import { StoreContext } from './store/store';
import FormRestorePassword from './components/FormRestorePassword';
import './index.css';
import loader from './assets/loader.gif';

function App() {
  const {
    scrolled: [scrolled],
    isEntered: [isEntered],
  } = React.useContext(StoreContext);

  return (
    <div className="container">
      <Header />
      <div
        className={`forms-box${scrolled ? ' forms-box_scrolled' : ''}${
          isEntered ? ' forms-box_in-system' : ''
        }`}
      >
        <div
          className={`forms-container${
            scrolled ? ' forms-container_scrolled' : ''
          }`}
        >
          <FormLogin />
          <FormRestorePassword />
        </div>
        <div className={`greeting${isEntered ? ' greeting_in-system' : ''}`}>
          {isEntered ? (
            <>
              <p className="greeting__text">Добрый день, Владислав!</p>
              <img className="greeting__loader" src={loader} alt="" srcSet="" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
