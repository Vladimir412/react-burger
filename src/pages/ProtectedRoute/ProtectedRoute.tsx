import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { FC, ReactNode } from "react";
import { useAppSelector } from "../../utils/hooks";

const ProtectedRoute: FC<RouteProps & { children: ReactNode }> = ({
  children,
  ...rest
}) => {
  const { isLogged } = useAppSelector((store) => store.authReducer);
  const location = useLocation();
  location.state = location.pathname;

  return (
    <Route
      {...rest}
      render={() =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: location.pathname } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
