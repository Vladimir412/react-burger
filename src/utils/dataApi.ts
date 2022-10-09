import { baseUrl } from "./constans";
import { checkResponse } from "./utils";
import { TIngredientDetails } from './types/types'

export const getData = () => {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
    .then((res) => res.data);
};

export const sentDataIngredients = (arr: Array<TIngredientDetails>, accessToken: string) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({
      ingredients: arr,
    }),
  }).then(checkResponse);
};

