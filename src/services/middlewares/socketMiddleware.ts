import { Middleware, MiddlewareAPI } from "redux"; 
import { store } from "../..";
import { AppDispatch, RootState, TApplicationActions } from "../../utils/types/types";
import { wsConnectStart, wsConnectSuccess,wsConnectError, wsConnectClosed, wsGetMessage, wsGetMessageMy } from "../actions/wsActionTypes";


export const socketMiddleware = (wsUrl: string): Middleware => {

    return (state) => {

        let socket: WebSocket | null = null;
        
        

    return next => (action: any) => {
      // const { dispatch, getState } = store;
      const { dispatch } = state
      const { type, payload } = action;
       

      
      if (type === 'WS_CONNECTION_START' && (payload.name || payload) === 'feed') {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}/all`);      
      }
      if (type === wsConnectStart.type && payload.name === 'orders') {
        const token = payload.token.replace('Bearer ', '')        
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      // console.log(socket);
      
      if (socket) {
        // console.log(socket.url);
        

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {                    
          dispatch(wsConnectSuccess());
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch(wsConnectError(event));
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {                    
          // const { data } = event;
          // const patsedData = JSON.parse(data)
          socket && socket.url === "wss://norma.nomoreparties.space/orders/all"
          // ? console.log("all")
          // : console.log("my")
          ? const { data } = event;
          const patsedData = JSON.parse(data)
          dispatch(wsGetMessage(patsedData))
          : const { data } = event;
          const patsedData = JSON.parse(data)
          dispatch(wsGetMessageMy(patsedData))
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch(wsConnectClosed());
        };

        if (type === 'WS_CONNECTION_CLOSED') {
          socket.close()
        }

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }
};