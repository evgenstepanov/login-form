import React, { useEffect } from 'react';
import { StoreContext } from '../store/store';
import attention from '../assets/attention.svg';

export default function FormRestorePassword() {
  const {
    scrolled: [scrolled, setScrolled],
    restoreForm: [restoreForm],
    isDisabledRestoreBtn: [isDisabledRestoreBtn],
    restoreValidation: [restoreValidation],
    handleFormChange,
    toggleRestoreBtn,
    cleanInput,
  } = React.useContext(StoreContext);

  useEffect(() => {
    toggleRestoreBtn();
  }, [restoreForm]);

  return (
    <form className="form restore-form">
      <h3 className="title form__title">Восстановление пароля</h3>
      <div className="input-container form__input-container_restore">
        <input
          className={`input input-restore ${restoreValidation}`}
          type="text"
          name="restore"
          id="restore"
          placeholder="e-mail@mail.ru"
          autoComplete="off"
          required
          value={restoreForm.restore}
          onChange={handleFormChange}
        />
        <label className="label" htmlFor="restore">
          <span className="label__name">Логин или e-mail*</span>
        </label>
        <input
          className="button input_button"
          type="button"
          onClick={() => cleanInput('restore')}
        />
      </div>
      <div className="restore-info">
        <img className="restore-info__img" src={attention} alt="attention" />
        <p className="restore-info__text">
          Пароль будет отправлен на электронную почту, к которой привязана
          учетная запись.
        </p>
      </div>
      <div className="submit-bar">
        <button
          className="button button-restore button-restore_back submit-bar__button-restore"
          type="button"
          onClick={() => setScrolled(!scrolled)}
        >
          Назад
        </button>
        <button
          className="button button-submit button-submit_no-array"
          type="button"
          disabled={isDisabledRestoreBtn}
        >
          Восстановить
        </button>
      </div>
    </form>
  );
}
