import { baseUrl } from "./constans";
import { checkResponse } from "./utils";
import { TRegister, TLogin } from "./types/types";

export const signUp = ( {email, password, name}: TRegister ) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse<any>(res));
};

export const signIn = ({ email, password }: TLogin) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const recoveryPassword = (email: string) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(checkResponse);
};

export const resetPassword = (password: string, token: string) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then(checkResponse);
};

export const logOut = (refreshToken: string) => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
};

export const getInfoUser = (accessToken: string) => {
  return fetch(`${baseUrl}/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  }).then(checkResponse);
};

export const updateInfoUser = ({
  name,
  email,
  password,
  accessToken,
}: TRegister & { accessToken: string }) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const updateToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};
