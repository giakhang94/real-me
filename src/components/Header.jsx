import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStatus from '../hooks/useAuthStatus';
function Header() {
    const navigate = useNavigate();
    const { loggedIn, isChecking } = useAuthStatus();
    const [isLogIn, setIsLogIn] = useState(loggedIn);
    useEffect(() => {
        setIsLogIn(loggedIn);
    }, [loggedIn]);
    const handleSignOut = async () => {
        const auth = getAuth();
        alert('tao');
        try {
            await signOut(auth);
            navigate('/');
            setIsLogIn(false);
            toast.success('You are now logged out');
        } catch (error) {
            toast.error(error.code);
        }
    };
    return (
        <>
            <div className="header flex justify-between">
                <div className="header__left">
                    <div className="header__left-logo">
                        <img
                            className="logo__img"
                            src={'https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'}
                            alt=""
                        />
                    </div>
                </div>
                <div className="header__right ">
                    <AiOutlineMenu className="laptop:hidden tablet:block mobile:block smallmobile:block" />
                    <div className="flex items-center laptop:flex flex-row tablet:hidden smallmobile:hidden mobile:hidden">
                        <ul className="header__right-menu ">
                            <li className="menu__item mega">
                                Mega menu
                                <div className="mega__menu">
                                    <div className="row1">
                                        <h4 className="mega__title">homes for sale</h4>
                                        <ul className="mega__container">
                                            <li className="mega__item">Homes For Sale</li>
                                            <li className="mega__item">New home consstruction</li>
                                            <li className="mega__item">Forceclosure Homes</li>
                                        </ul>
                                    </div>
                                    <div className="row2">
                                        <h4 className="mega__title">homes for sale</h4>
                                        <ul className="mega__container">
                                            <li className="mega__item">Homes For Sale</li>
                                            <li className="mega__item">New home consstruction</li>
                                            <li className="mega__item">Forceclosure Homes</li>
                                        </ul>
                                    </div>
                                    <div className="row3">
                                        <h4 className="mega__title">homes for sale</h4>
                                        <ul className="mega__container">
                                            <li className="mega__item">Homes For Sale</li>
                                            <li className="mega__item">New home consstruction</li>
                                            <li className="mega__item">Forceclosure Homes</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="menu__item">Sell</li>
                            <Link to="/officce">
                                <li className="menu__item">Offices</li>
                            </Link>
                        </ul>
                        <div className="menu__login relative">
                            <Link to="/profile">
                                <span className="login__item login__signUp">{isLogIn ? 'Profile' : 'Sign In'}</span>
                            </Link>
                            {isLogIn && (
                                <span className="text-sm pl-3 cursor-pointer" onClick={handleSignOut}>
                                    Sign Out
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
