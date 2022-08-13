const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';


const getData = () => {
    return fetch(`${urlIngredients}`)
    .then(res => res.json())
    .then(res => res.data)
}

export default getData
