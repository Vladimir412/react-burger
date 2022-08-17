const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const urlSentData = 'https://norma.nomoreparties.space/api/orders'


export const getData = () => {
    return fetch(`${urlIngredients}`)
    .then(checkResponse)
    .then(res => res.data)
}

export const sentDataIngredients = (arr) => {
    return fetch(`${urlSentData}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: arr
        })
    })
    .then(checkResponse)
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

