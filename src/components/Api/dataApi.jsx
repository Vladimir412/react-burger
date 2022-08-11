const url = 'https://norma.nomoreparties.space/api/ingredients';


export const getData = () => {
    fetch(`${url}`)
    .then(res => res.ok ? res.json() : Promise.reject(console.log(res)))
    .then(data => data)
}



