import { TResponseBody, CustomResponse } from './types'

export const checkResponse = (res: CustomResponse<TResponseBody>): Promise<TResponseBody< '', {}>> => {
    return res.ok ? res.json() : res.json().then((err: object) => Promise.reject(err));
  };