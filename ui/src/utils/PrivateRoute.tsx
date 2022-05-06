import { ROLES } from './roles';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<ROLES>;
}) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  console.log(typeof user);
  console.log(user.role);
  console.log(roles.includes(user.role));

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (user && !userHasRequiredRole) {
    return <Navigate to='/home' />; // build your won access denied page (sth like 404)
  }

  return children;
};

export default PrivateRoute;
