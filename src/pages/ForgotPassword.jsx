import Header from '../components/Header';
import signInImage from '../assets/images/signin.jfif';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnGoogle from '../components/BtnGoogle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function SignUp() {
    const [emailValue, setEmailvalue] = useState('');
    const [retypeEmail, setRetypeValue] = useState('');
    const auth = getAuth();
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (retypeEmail === emailValue) {
            try {
                await sendPasswordResetEmail(auth, emailValue);
                toast.success('email sent! s' + 'check your Spam/Promotion/Inbox email');
            } catch (error) {
                toast.error(error.code);
            }
        } else {
            toast.error('Email not match');
        }
    };
    return (
        <>
            <Header />
            <div className="signin">
                <h2 className="signin__title text-center text-lg font-bold">Forgot your password?</h2>
                <div className="signin__container  laptop:flex laptop:flex-row mobile:flex mobile:flex-col tablet:flex tablet:flex-row smallmobile:flex smallmobile:flex-col">
                    <div className="signin__img rounded laptop:w-2/4 tablet:w-2/4 mobile:w-full smallmoile:w-full p-8">
                        <img src={signInImage} alt="" className="rounded" />
                    </div>
                    <div className="signin__form laptop:w-2/4 tablet:w-2/4 mobile:w-full smallmoile:w-full p-8">
                        <form action="" className="w-full">
                            <div className="form__input mb-5 rounded-md border border-gray-300 h-9 p-1 email">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={emailValue}
                                    onChange={(e) => {
                                        setEmailvalue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input mb-5 rounded-md border border-gray-300 h-9 p-1 password relative">
                                <input
                                    type="text"
                                    placeholder="Retype your Email"
                                    value={retypeEmail}
                                    onChange={(e) => {
                                        setRetypeValue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__more   flex justify-between">
                                <span className="more__register">
                                    Don't have an Account?{' '}
                                    <Link className="link text-red-500" to="/signup">
                                        Sign up
                                    </Link>
                                </span>
                                <span className="more__forgotpw ">
                                    <Link to="/signin" className="link text-blue-500">
                                        Or try signing in again
                                    </Link>
                                </span>
                            </div>
                            <button
                                className="form__btn btn-signIn h-10 text-white text-bold text-center w-full bg-blue-600 rounded-md my-5"
                                onClick={handleResetPassword}
                            >
                                RESET YOUR PASSWORD
                            </button>
                        </form>
                        <div className="flex w-full items-center mt-0 my-4 before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500 or">
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
