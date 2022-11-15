import Header from '../components/Header';
import signInImage from '../assets/images/signin.jfif';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnGoogle from '../components/BtnGoogle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailvalue] = useState('');
    const [fullnameValue, setFullnameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [data, setData] = useState({ fullname: '', email: '', password: '' });
    const { fullname, email, password } = data;
    return (
        <>
            <Header />
            <div className="signin">
                <h2 className="signin__title text-center text-lg font-bold">Sign up</h2>
                <div className="signin__container">
                    <div className="signin__img rounded">
                        <img src={signInImage} alt="" className="rounded" />
                    </div>
                    <div className="signin__form">
                        <form action="" className="w-full">
                            <div className="form__input email">
                                <input
                                    type="text"
                                    placeholder="Fullname"
                                    value={fullnameValue}
                                    onChange={(e) => {
                                        setFullnameValue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input email">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={emailValue}
                                    onChange={(e) => {
                                        setEmailvalue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form__input password relative">
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
                            <div className="form__more">
                                <span className="more__register">
                                    Have an account?{' '}
                                    <Link className="link" to="/signin">
                                        Sign in
                                    </Link>
                                </span>
                                <span className="more__forgotpw">
                                    <Link to="/forgotpassword" className="link">
                                        Forgot password?
                                    </Link>
                                </span>
                            </div>
                        </form>
                        <button
                            className="form__btn btn-signIn"
                            onClick={() => {
                                setData({ email: { emailValue }, password: { passwordValue } });
                            }}
                        >
                            SIGN UP
                        </button>
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
