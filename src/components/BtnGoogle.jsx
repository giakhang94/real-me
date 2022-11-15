import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

function BtnGoogle({ data }) {
    const handleGoogleSignUp = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                const data = { email: user.email, displayName: user.displayName, timeStamp: serverTimestamp() };
                if (doc(db, 'users', user.uid)) {
                    // kiểm tra tham chiếu có tồn tại hay k (thông tin user vừa login = Google có tồn tại hay k?)
                    //sau đó đưa data lên table của db, table có tên user, key = uid, data mình truyền vào
                    setDoc(doc(db, 'users', user.uid), data);
                }
                toast.success('Login with google successfully');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                toast.error('Login with google error!');
            });
    };
    return (
        <button
            onClick={handleGoogleSignUp}
            className="flex items-center justify-center h-11 w-full text-center text-white bg-red-600 rounded text-sm font-semibold"
        >
            <span>
                <FcGoogle className=" text-lg mr-1 bg-white rounded-full p-1" />
            </span>
            <span>COUNTINUE WITH GOOGLE</span>
        </button>
    );
}

export default BtnGoogle;
