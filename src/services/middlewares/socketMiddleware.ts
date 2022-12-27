import { Middleware, MiddlewareAPI } from "redux";
import { store } from "../..";
import {
  AppDispatch,
  RootState,
  TApplicationActions,
} from "../../utils/types/types";
import {
  wsConnectStart,
  wsConnectSuccess,
  wsConnectError,
  wsConnectClosed,
  wsGetMessage,
  wsGetMessageMy,
} from "../actions/wsActionTypes";
import { TWSActionTypes } from "../../utils/types/typesWS";

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
  const { wsConnectStart,
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetData,
    wsSendData
  } = wsActions

  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;   

    return (next) => (action) => {
      // const { dispatch, getState } = store;
      const { dispatch } = store;
      const { type, payload } = action;
   

      // console.log(type);
      // console.log(payload);
            
      if (
        type === wsConnectStart.type
        // type === wsConnectStart.type
        // payload.name === "feed"
      ) {
        // объект класса WebSocket
        // console.log(payload);
        
        socket = new WebSocket(payload);
      }
      // if (type === wsConnectStart.type && payload.name === "orders") {
        
        
        // if (wsConnectStart.type && payload.token) {
        // const token = payload.token.replace("Bearer ", "");
        // socket = new WebSocket(`${wsUrl}?token=${token}`);
        // }
      // }

      // console.log(socket);

      if (socket) {
        // console.log(socket.url);

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
          if (
            socket
            // socket.url === "wss://norma.nomoreparties.space/orders/all"
          ) {
            try {
            const { data } = event;            
            const parsedData = JSON.parse(data);
            dispatch(wsGetData(parsedData));
            } catch(err) {
              console.log(err)
            }
          // } else {
          //   const { data } = event;
          //   const parsedData = JSON.parse(data);
          //   dispatch(wsGetMessageMy(parsedData));
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
