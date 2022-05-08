import { Roles } from './roles';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<Roles>;
}) => {
  const user = localStorage.getItem('user');
  const loggedUser = user && JSON.parse(user || '');

  const userHasRequiredRole =
    user && roles.includes(loggedUser.role) ? true : false;

  if (loggedUser === '') {
    return <Navigate to='/login' />;
  }

  if (loggedUser && !userHasRequiredRole) {
    return <Navigate to='/home' />; // build your won access denied page (sth like 404)
  }

  return children;
};

export default PrivateRoute;
