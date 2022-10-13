import { TResponseBody, CustomResponse } from './types/types'

// export const checkResponse = (res: CustomResponse<TResponseBody>): Promise<TResponseBody< '', {}>> => {
//     return res.ok ? res.json() : res.json().then((err: object) => Promise.reject(err));
//   };

export const checkResponse = <T>(res: CustomResponse): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err: object) => Promise.reject(err));
};

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}