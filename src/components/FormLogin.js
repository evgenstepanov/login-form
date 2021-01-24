import React, { useEffect } from 'react';
import { StoreContext } from '../store/store';

export default function FormLogin() {
  const {
    loginForm: [loginForm],
    scrolled: [scrolled, setScrolled],
    isDisabledLoginBtn: [isDisabledLoginBtn],
    loginValidation: [loginValidation],
    passwordValidation: [passwordValidation],
    handleFormChange,
    toggleLoginBtn,
    getInSystem,
    cleanInput,
  } = React.useContext(StoreContext);

  useEffect(() => {
    toggleLoginBtn();
  }, [loginForm]);

  return (
    <form className="form login-form">
      <h3 className="title form__title">Данные для входа</h3>
      <div className="input-container form__input-container">
        <input
          className={`input input-login ${loginValidation}`}
          type="text"
          name="login"
          id="login"
          placeholder="e-mail@mail.ru"
          autoComplete="off"
          required
          value={loginForm.login}
          onChange={handleFormChange}
          onKeyPress={getInSystem}
        />
        <label className="label" htmlFor="login">
          <span className="label__name">Логин*</span>
          <div className="clear" />
        </label>
        <input
          className="button input_button"
          type="button"
          onClick={() => cleanInput('login')}
        />
        {loginValidation === 'wrong' ? (
          <p className="input-login__wrong">Введите логин корректно</p>
        ) : null}
      </div>
      <div className="input-container form__input-container">
        <input
          className={`input input-password ${passwordValidation}`}
          type="password"
          name="password"
          id="password"
          placeholder="введите пароль"
          autoComplete="off"
          required
          value={loginForm.password}
          onChange={handleFormChange}
          onKeyPress={getInSystem}
        />
        <label className="label" htmlFor="login">
          <span className="label__name">Пароль*</span>
        </label>
        <input
          className="button input_button"
          type="button"
          onClick={() => cleanInput('password')}
        />
      </div>
      <div className="submit-bar">
        <button
          className="button button-restore submit-bar__button-restore"
          type="button"
          onClick={() => setScrolled(!scrolled)}
        >
          Не помню пароль
        </button>
        <button
          className="button button-submit"
          type="button"
          disabled={isDisabledLoginBtn}
          onClick={getInSystem}
        >
          Войти в систему
        </button>
      </div>
    </form>
  );
}
