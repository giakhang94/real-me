import { getAuth } from 'firebase/auth';
import useAuthStatus from '../hooks/useAuthStatus';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';

function PrivateRoute() {
    const authStatus = useAuthStatus();
    const loggedIn = authStatus.loggedIn;
    return loggedIn ? <Profile /> : <SignIn />;
}

export default PrivateRoute;
