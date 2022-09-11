const baseUrl = "https://norma.nomoreparties.space/api";

export const getData = () => {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
    .then((res) => res.data);
};

export const sentDataIngredients = (arr, accessToken) => {
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

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
