import { getAuth } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router';
import useAuthStatus from '../hooks/useAuthStatus';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import Spinner from './Spinner';

function PrivateRoute() {
    const authStatus = useAuthStatus();
    const loggedIn = authStatus.loggedIn;
    if (authStatus.isChecking) {
        return <Spinner />;
    }
    return loggedIn ? <Outlet /> : <Navigate to="signin" />;
}

export default PrivateRoute;
