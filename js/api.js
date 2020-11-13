'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };

  const addConnectionErrorListener = (onError, xhr) => {
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
  };

  const addTimeoutErrorListener = (onError, xhr) => {
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
  };

  const getServerData = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        return onSuccess(xhr.response);
      }
      return onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    });

    xhr.timeout = window.constants.TIMEOUT_IN_MS;

    addConnectionErrorListener(onError, xhr);
    addTimeoutErrorListener(onError, xhr);

    xhr.open(`GET`, window.constants.URL_GET_DATA);
    xhr.send();
  };

  const sendFormData = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.main.setInactive();
        window.form.createSuccessPopup();

      } else {
        window.form.createErrorPopup();
      }

    });

    xhr.open(`POST`, window.constants.URL_SEND_DATA);
    xhr.send(data);
  };

  window.api = {
    getServerData,
    sendFormData,
  };
})();
