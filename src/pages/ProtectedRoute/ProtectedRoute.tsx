import { Route, Redirect, useLocation, useHistory, RouteProps } from "react-router-dom";
import { FC, ReactNode } from 'react'
import { useSelector } from "react-redux";
import { useAppSelector } from "../../utils/hooks";

const ProtectedRoute: FC<RouteProps & {children: ReactNode}> = ({ children, ...rest }) => {
  const { isLogged } = useAppSelector((store) => store.authReducer);
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
