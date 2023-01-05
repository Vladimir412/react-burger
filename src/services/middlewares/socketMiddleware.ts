import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../../utils/types/types";
import { TWSActionTypes } from "../../utils/types/typesWS";

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
  const {
    wsConnectStart,
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetData,
    wsSendData,
  } = wsActions;

  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      // console.log(type);
      // console.log(payload);

      if (type === wsConnectStart.type) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch(wsConnectSuccess());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch(wsConnectError(event));
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          if (socket) {
            try {
              const { data } = event;
              const parsedData = JSON.parse(data);
              dispatch(wsGetData(parsedData));
            } catch (err) {
              console.log(err);
            }
          }
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch(wsConnectClosed());
        };

        if (type === wsConnectClosed.type) {
          socket.close();
        }

        if (type === wsSendData.type) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
