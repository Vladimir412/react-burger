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

export const countPrice = (item: any, array: any) => {
  let totalPrice: number = 0

  item.forEach((i: any) => {      
    array.forEach((j: any) => {
      if (j._id === i) {          
        if (j.type === 'bun') {
          totalPrice += (j.price * 2)
        }
        totalPrice += j.price
      }
    })
  })
  return totalPrice
}

export const countTime = (time: string) => {
  let result: string;
  const timeResult: string = time.slice(11, 16);
  const currentDate: number = Date.parse(Date());
  const days: number = (currentDate - Date.parse(time)) / 86400000;
  const day: number = Math.round(days);
  if (day === 0) {
    result = "Сегодня";
  } else if (day === 1) {
    result = "Вчера";
  } else if (day >= 2 && day <= 4) {
    result = `${day} дня назад`;
  } else if (day >= 5 && day <= 7) {
    result = `${day} дней назад`;
  } else {
    result = "Болше недели назад";
  }

  return `${result}, ${timeResult} i-GMT+3`;
};

export const addZero = (number: number) => {
  let str = number.toString();
  if (str.length < 6) {
    for (let j: number = str.length; j < 6; j++) {
      str = "0" + str;
    }
  }
  return str
}

export const identityStatus = (status: string) => {
  if (status === "done") {
    return "Выполнен"
  } else if (status === "pending") {
    return "Готовится"
  } else {
    return "Создан"
  }
  // status === "done"
  // ? "Выполнен"
  // : status === "pending"
  // ? "Готовится"
  // : "Создан"
}

