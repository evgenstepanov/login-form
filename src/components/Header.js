import React from 'react';
import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <div className="header">
      <img className="logo header__logo" src={logo} alt="" />
      <h1 className="name header__name">
        Корпоративная информационная система
      </h1>
    </div>
  );
}
