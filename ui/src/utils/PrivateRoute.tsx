import {Navigate} from 'react-router-dom';
import {Roles} from "./models/common.enums";
import {parseUser} from "./models/common";

const PrivateRoute = ({
                          children,
                          roles,
                      }: {
    children: JSX.Element;
    roles: Array<Roles>;
}) => {
    const user = parseUser()
    const userHasRequiredRole = user && roles.includes(user.type);

    if (!user) {
        return <Navigate to='/login'/>;
    } else if (!userHasRequiredRole) {
        return <Navigate to='/home'/>;
    }

    return children;
};

export default PrivateRoute;
