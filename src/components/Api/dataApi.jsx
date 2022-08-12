const url = 'https://norma.nomoreparties.space/api/ingredients';


const getData = () => {
    fetch(`${url}`)
    .then(res => res.ok ? res.json() : Promise.reject(console.log(res)))
}

export default getData
