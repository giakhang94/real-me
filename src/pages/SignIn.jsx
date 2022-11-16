import Header from '../components/Header';
import signInImage from '../assets/images/signin.jfif';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BtnGoogle from '../components/BtnGoogle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

function SignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailvalue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const data = { email: emailValue };
    const onSubmit = async (e) => {
        e.preventDefault();
        //xử lý của firebase
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
            const user = userCredential.user;
            navigate('/');
            toast.success('Login successfully');
        } catch (error) {
            toast.error(error.code);
        }
        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });
    };
    return (
        <>
            <Header />
            <div className="signin">
                <h2 className="signin__title text-center text-lg font-bold">Sign In</h2>
                <div className="signin__container laptop:flex laptop:flex-row mobile:flex mobile:flex-col tablet:flex tablet:flex-row smallmobile:flex smallmobile:flex-col">
                    <div className="signin__img rounded p-8 laptop:w-2/4  tablet:w-full mobile:w-full smallmoile:w-full">
                        <img src={signInImage} alt="" className="rounded" />
                    </div>
                    <div className="signin__form laptop:w-2/4 tablet:w-2/4 mobile:w-full smallmoile:w-full p-8">
                        <form action="" className="w-full" onSubmit={onSubmit}>
                            <div className="form__input w-full h-9 p-1 rounded-md mb-5 border border-gray-300 email">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={emailValue}
                                    onChange={(e) => {
                                        setEmailvalue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input w-full h-9 p-1 rounded-md mb-5 border border-gray-300 password relative">
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
                                    Don't have an account?{' '}
                                    <Link className="link text-red-500" to="/signup">
                                        Sign up
                                    </Link>
                                </span>
                                <span className="more__forgotpw">
                                    <Link to="/forgotpassword" className="link text-blue-600">
                                        Forgot password?
                                    </Link>
                                </span>
                            </div>
                            <button className="form__btn btn-signIn my-5 h-10 w-full text-center text-white text-bold rounded-md bg-blue-600">
                                SIGN IN
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

export default SignIn;
