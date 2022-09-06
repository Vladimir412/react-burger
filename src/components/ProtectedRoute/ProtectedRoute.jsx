import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children, ...rest}) => {
    const { isLogged } = useSelector(state => state.authReducer)
    console.log(isLogged);

    return (
        <Route {...rest} render={() => isLogged ? (children) : (<Redirect to='/login'/>)} />
    )
}

export default ProtectedRoute