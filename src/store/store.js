import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);
export const StoreProvider = ({ children }) => {
  // валидный юзер для входа в систему
  const validUser = {
    login: 'pinchuk.fl@yandex.ru',
    password: '123',
  };

  // сохранение текстового вввода в инпуты логина и пароля
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
  });

  // сохранение текстового вввода в инпут "восстановления пароля"
  const [restoreForm, setRestoreForm] = useState({
    restore: '',
  });

  // проверка вводимого Логина на валидность
  const [loginValidation, setLoginValidation] = useState('');
  const checkLogin = (value) => {
    switch (value) {
      case '':
        setLoginValidation('empty'); // на случай пустой строки
        break;
      case validUser.login: // полное совпадение юзера
        setLoginValidation('right');
        break;
      case validUser.login.slice(0, value.length): // совпадение первых символов ввода с юзером
        setLoginValidation('typing');
        break;
      default:
        setLoginValidation('wrong'); // никакого совпадения с юзером
        break;
    }
  };

  // проверка вводимого Пароля на валидность
  const [passwordValidation, setPasswordValidation] = useState('');
  const checkPassword = (value) => {
    switch (value) {
      case '': // на случай пустой строки
        setPasswordValidation('empty');
        break;
      case validUser.password: // полное совпадение пароля, но если логин уже валидный
        if (loginValidation === 'right') setPasswordValidation('right');
        break;
      default:
        setPasswordValidation('typing'); // любой набор текста
        break;
    }
  };

  const [restoreValidation, setRestoreValidation] = useState('');
  const checkRestore = (value) => {
    switch (value) {
      case '': // на случай пустой строки
        setRestoreValidation('empty');
        break;
      default:
        setRestoreValidation('typing'); // любой набор текста
        break;
    }
  };

  // управление вводом текста в любой из трех инпутов
  // и распределение по соответствующим стейтам
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'login') {
      checkLogin(value);
      setLoginForm({ ...loginForm, [name]: value });
    }
    if (name === 'password') {
      checkPassword(value);
      setLoginForm({ ...loginForm, [name]: value });
    }
    if (name === 'restore') {
      checkRestore(value);
      setRestoreForm({ [name]: value });
    }
  };

  // очистка логина или пароля по клику на соответствующий крестик
  const cleanInput = (input) => {
    switch (input) {
      case 'login':
        setLoginForm({ ...loginForm, login: '' });
        checkLogin('');
        break;
      case 'password':
        setLoginForm({ ...loginForm, password: '' });
        checkPassword('');
        break;
      case 'restore':
        setRestoreForm({ restore: '' });
        checkRestore('');
        break;
      default:
        break;
    }
  };

  // управление скролом перехода на форму "восстановления пароля"
  // при нажатии на "восстановить пароль"
  // и обратно при нажатии "назад"
  const [scrolled, setScrolled] = useState(false);

  // снимает аттрибут disable кнопки "Войти в систему",
  // если введены одновременно корректные логин и пароль
  const [isDisabledLoginBtn, setIsDisabledLoginBtn] = useState(true);
  const toggleLoginBtn = () => {
    if (
      loginForm.login === validUser.login &&
      loginForm.password === validUser.password
    ) {
      setIsDisabledLoginBtn(false);
    } else {
      setIsDisabledLoginBtn(true);
    }
  };

  // снимает аттрибут disable кнопки "Восстановить"
  // если введены любые данные в инпут
  const [isDisabledRestoreBtn, setIsDisabledRestoreBtn] = useState(true);
  const toggleRestoreBtn = () => {
    if (restoreForm.restore) {
      setIsDisabledRestoreBtn(false);
    } else {
      setIsDisabledRestoreBtn(true);
    }
  };

  // осуществлен вход в систему, по валидному логину и паролю
  const [isEntered, setIsEntered] = useState(false);
  const getInSystem = (e) => {
    // вход при нажатии на Enter при фокусе на логине или пароле
    // при условии, что логин и пароль введены верно
    if (
      e.key === 'Enter' &&
      JSON.stringify(validUser) === JSON.stringify(loginForm)
    ) {
      setIsEntered(!isEntered);
    }
    // сразу вход при событии "click",
    // который придет от кнопки "Войти в систему"
    // т.к. она становится активной только при верных логине и пароле
    if (e.type === 'click') {
      setIsEntered(!isEntered);
    }
  };

  // сбор всех параметров в единый объект
  // для передачи через context
  const store = {
    validUser,
    scrolled: [scrolled, setScrolled],
    loginForm: [loginForm, setLoginForm],
    restoreForm: [restoreForm, setRestoreForm],
    handleFormChange,
    toggleLoginBtn,
    toggleRestoreBtn,
    checkIsValid: checkLogin,
    isDisabledLoginBtn: [isDisabledLoginBtn, setIsDisabledLoginBtn],
    isDisabledRestoreBtn: [isDisabledRestoreBtn, setIsDisabledRestoreBtn],
    loginValidation: [loginValidation, setLoginValidation],
    passwordValidation: [passwordValidation, setPasswordValidation],
    restoreValidation: [restoreValidation, setRestoreValidation],
    isEntered: [isEntered, setIsEntered],
    getInSystem,
    cleanInput,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
