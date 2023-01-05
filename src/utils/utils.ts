import { CustomResponse, TIngredient } from './types/types'

export const checkResponse = <T>(res: CustomResponse): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err: object) => Promise.reject(err));
};

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const countPrice = (item: Array<string>, array: Array<TIngredient>) => {
  let totalPrice: number = 0

  item.forEach((i) => {      
    array.forEach((j) => {
      if (j._id === i) {          
        totalPrice += j.price
      }
    })
  })
  return totalPrice
}

export const countTime = (timeInfo: string) => {
  let result: string;
  const time: string = timeInfo.slice(11, 16);
  const hours: number = Number(time.slice(0, 2)) + 3 === 24
    ? Number("00")
    : Number(time.slice(0, 2)) + 3 > 24
    ? 24 - Number(time.slice(0, 2)) + 3
    : Number(time.slice(0, 2)) + 3
  const strHours: string = String(hours)
  const timeResult: string = strHours + time.substring(2)
  const currentDate: number = Date.parse(Date());  
  const days: number = (currentDate - Date.parse(timeInfo)) / 86400000;
  
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

export const addZero = (number: number): string => {
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
}

