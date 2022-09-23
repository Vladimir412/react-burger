import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLogged } = useSelector((state) => state.authReducer);
  const location = useLocation()
  const history = useHistory()
  location.state = location.pathname


  return (
    <Route
      {...rest}
      render={() => (isLogged ? children : <Redirect to={{pathname: '/login', state: {from: location.pathname}}} />)}
    />
  );
};

export default ProtectedRoute;
