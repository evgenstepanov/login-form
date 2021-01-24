import React from 'react';
import Header from './components/Header';
import FormLogin from './components/FormLogin';
import { StoreContext } from './store/store';
import FormRestorePassword from './components/FormRestorePassword';
import './index.css';

function App() {
  const {
    scrolled: [scrolled],
  } = React.useContext(StoreContext);

  return (
    <div className="container">
      <Header />
      <div className="forms-box">
        <div className={`forms-container${scrolled ? ' scrolled' : ''}`}>
          <FormLogin />
          <FormRestorePassword />
        </div>
      </div>
    </div>
  );
}

export default App;
