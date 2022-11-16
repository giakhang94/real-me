import { FirebaseError } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        const auth = getAuth();
        console.log('hook auth', auth);
        auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log('tao', user);
                setLoggedIn(true);
            }
            setIsChecking(false);
        });
    }, []);
    // console.log(loggedIn);
    return { loggedIn, isChecking };
}

export default useAuthStatus;
