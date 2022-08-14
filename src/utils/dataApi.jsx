const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';


const getData = () => {
    return fetch(`${urlIngredients}`)
    .then(checkResponse)
    .then(res => res.data)
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export default getData
