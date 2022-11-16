import Header from '../components/Header';
import signInImage from '../assets/images/signin.jfif';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BtnGoogle from '../components/BtnGoogle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function SignUp() {
    const navigate = useNavigate();
    //tao toast using toatsify
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailvalue] = useState('');
    const [fullnameValue, setFullnameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const data = { email: emailValue, fullnameValue: fullnameValue };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('userdata', data);
        // xy ly cua firebase
        try {
            const auth = getAuth();
            // console.log('auth', auth);
            const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
            updateProfile(auth.currentUser, { displayName: fullnameValue });
            const user = userCredential.user;
            data.timestamp = serverTimestamp();
            await setDoc(doc(db, 'users', user.uid), data);
            toast.success('Signup success!');
            navigate('/');
        } catch (error) {
            toast.error(error.code);
            // console.log(error);
        }
        //ở dưới là code từ thư viện đưa
        // const auth = getAuth();
        // createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        //     .then((userCredential) => {
        //         // Signed in
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(error);
        //         // ..
        //     });
    };
    return (
        <>
            <div className="signin">
                <h2 className="signin__title text-center text-lg font-bold">Sign up</h2>
                <div className="signin__container laptop:flex laptop:flex-row mobile:flex mobile:flex-col tablet:flex tablet:flex-row smallmobile:flex smallmobile:flex-col ">
                    <div className="signin__img p-8 rounded laptop:w-2/4 tablet:w-2/4 mobile:w-full smallmoile:w-full">
                        <img src={signInImage} alt="" className="rounded" />
                    </div>
                    <div className="signin__form p-8 laptop:w-2/4 tablet:w-2/4 mobile:w-full smallmoile:w-full">
                        <form action="" className="w-full" onSubmit={onSubmit}>
                            <div className="form__input email w-full p-1 border box-border border-gray-300 rounded-md h-9 mb-5">
                                <input
                                    type="text"
                                    placeholder="Fullname"
                                    value={fullnameValue}
                                    onChange={(e) => {
                                        setFullnameValue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input email w-full p-1 border box-border border-gray-300 rounded-md h-9 mb-5">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={emailValue}
                                    onChange={(e) => {
                                        setEmailvalue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input password relative w-full p-1 border border-gray-300 rounded-md box-border h-9 mb-5">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={passwordValue}
                                    onChange={(e) => {
                                        setPasswordValue(e.target.value);
                                    }}
                                />
                                {!showPassword && (
                                    <AiFillEye
                                        className="absolute right-1 top-2/4 -translate-y-1/2 text-lg cursor-pointer"
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                )}
                                {showPassword && (
                                    <AiFillEyeInvisible
                                        className="absolute right-1 top-2/4 -translate-y-1/2 text-lg cursor-pointer"
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                )}
                            </div>
                            <div className="form__more flex justify-between">
                                <span className="more__register">
                                    Have an account?{' '}
                                    <Link className="link text-red-500" to="/signin">
                                        Sign in
                                    </Link>
                                </span>
                                <span className="more__forgotpw">
                                    <Link to="/forgotpassword" className="link text-blue-600">
                                        Forgot password?
                                    </Link>
                                </span>
                            </div>
                            <button
                                className="form__btn btn-signIn bg-blue-600 w-full text-white text-bold text-center
                            h-10 rounded-md my-5"
                            >
                                SIGN UP
                            </button>
                        </form>
                        <div className="flex w-full items-center  my-4 mt-0 before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500 or">
                            <p className="text-center font-semibold mx-4">OR</p>
                        </div>
                        <BtnGoogle />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
