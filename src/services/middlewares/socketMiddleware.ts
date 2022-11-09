import { Middleware, MiddlewareAPI } from "redux"; 
import { store } from "../..";
import { AppDispatch, RootState, TApplicationActions } from "../../utils/types/types";
import { wsConnectStart, wsConnectSuccess,wsConnectError, wsConnectClosed, wsGetMessage } from "../actions/wsActionTypes";


export const socketMiddleware = (wsUrl: string): Middleware => {

    return (state) => {

        let socket: WebSocket | null = null;
        
        

    return next => (action: any) => {
      // const { dispatch, getState } = store;
      const { dispatch } = state
      const { type, payload } = action;      
      
      
      if (type === wsConnectStart.type && payload.name === 'feed') {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}/all`);      
        console.log('Соединение all');
      }
      if (type === wsConnectStart.type && payload.name === 'orders') {
        const token = payload.token.replace('Bearer ', '')        
        socket = new WebSocket(`${wsUrl}?token=${token}`);
        console.log('Соединение личных заказов');
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {       
          console.log('Соединение открыто');
             
          dispatch(wsConnectSuccess());
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch(wsConnectError(event));
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {    
          console.log("Полуили");
                
          const { data } = event;
          const patsedData = JSON.parse(data)
          dispatch(wsGetMessage(patsedData));
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          console.log('Соединение закрыто');
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