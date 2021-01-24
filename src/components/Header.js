import React from 'react';
import { StoreContext } from '../store/store';
import logo from '../assets/logo.svg';

export default function Header() {
  const {
    isEntered: [isEntered],
  } = React.useContext(StoreContext);
  return (
    <div className={`header${isEntered ? ' header_in-system' : ''}`}>
      <img
        className={`logo header__logo ${
          isEntered ? 'header__logo_in-system' : ''
        }`}
        src={logo}
        alt="logo"
      />
      <h1 className="name header__name">
        Корпоративная информационная система
      </h1>
    </div>
  );
}
