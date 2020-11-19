'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };

  const createXHR = function (options) {
    const timeout = options.timeout;
    const requestType = options.requestType;
    const requestUrl = options.requestUrl;
    const onError = options.onError;

    const xhr = new XMLHttpRequest();

    xhr.timeout = timeout;
    xhr.open(requestType, requestUrl);
    xhr.responseType = `json`;

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + timeout + `мс`);
    });

    return xhr;
  };

  const getServerData = function (onSuccess, onError) {
    const xhr = createXHR({
      requestUrl: window.constants.URL_GET_DATA,
      requestType: `GET`,
      onError,
      timeout: window.constants.TIMEOUT_IN_MS,
    });

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        return onSuccess(xhr.response);
      }
      return onError();
    });

    xhr.send();
  };

  const sendFormData = (data, onSuccess, onError) => {
    const xhr = createXHR({
      requestUrl: window.constants.URL_SEND_DATA,
      requestType: `POST`,
      onError,
      timeout: window.constants.TIMEOUT_IN_MS,
    });

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.main.setInactive();
        window.form.createSuccessPopup();

      } else {
        window.form.createErrorPopup();
      }
    });

    xhr.send(data);
  };

  window.api = {
    getServerData,
    sendFormData,
  };
})();
