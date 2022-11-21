import { MobileFriendly } from '@mui/icons-material';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStatus from '../hooks/useAuthStatus';
import MobileMegaMenu from './MobileMegaMenu';
function Header() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { loggedIn, isChecking } = useAuthStatus();
    const [isLogIn, setIsLogIn] = useState(loggedIn);
    const [mobileMenu, setMobileMenu] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLogIn(true);
            }
        });
    }, []);
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
            setIsLogIn(false);
            toast.success('You are now logged out');
        } catch (error) {
            toast.error(error.code);
        }
    };
    const handCloseMobieMenu = () => {
        setMobileMenu(false);
    };
    return (
        <>
            <div className="header relative flex justify-between z-1">
                {mobileMenu && <MobileMegaMenu closeMobieMenu={handCloseMobieMenu} />}
                <div className="header__left">
                    <Link to="/">
                        <div className="header__left-logo">
                            <img
                                className="logo__img"
                                src={'https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'}
                                alt=""
                            />
                        </div>
                    </Link>
                </div>
                <div className="header__right ">
                    <div className="mobile-menu h-full laptop:hidden relative flex space-x-3 items-center">
                        <AiOutlineMenu className=" cursor-pointer laptop:hidden tablet:block mobile:block smallmobile:block" />
                        <ul className="shadow-lg sub-container hidden  -my-[3px] w-[200px] absolute top-[100%] right-0 z-[1000000] bg-white py-3 px-8">
                            <div className="menu__login relative w-full mt-5 mb-5">
                                <span
                                    className="login__item login__signUp"
                                    onClick={() => {
                                        navigate('/profile');
                                    }}
                                >
                                    {isLogIn ? 'Profile' : 'Sign In'}
                                </span>
                                {isLogIn && (
                                    <span className="text-sm pl-3 cursor-pointer" onClick={handleSignOut}>
                                        Sign Out
                                    </span>
                                )}
                            </div>
                            <Link to="/offer">
                                <li className="cursor-pointer text-md hover:font-semibold mb-3">Recent Offers</li>
                            </Link>
                            <Link to="/sale">
                                <li className="cursor-pointer text-md hover:font-semibold mb-3">Homes For Sale</li>
                            </Link>
                            <Link to="/rent">
                                <li className="cursor-pointer text-md hover:font-semibold mb-3">Homes For Rent</li>
                            </Link>
                            <li
                                onClick={() => {
                                    setMobileMenu((prev) => !prev);
                                }}
                                className="cursor-pointer text-md hover:font-semibold mb-3"
                            >
                                Mega Menu
                            </li>
                        </ul>
                    </div>
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
                            <Link to="/Sale">
                                <li className="menu__item">Sale</li>
                            </Link>
                            <Link to="/offer">
                                <li className="menu__item">Offers</li>
                            </Link>
                        </ul>
                        <div className="menu__login relative">
                            <span
                                className="login__item login__signUp"
                                onClick={() => {
                                    navigate('/profile');
                                }}
                            >
                                {isLogIn ? 'Profile' : 'Sign In'}
                            </span>
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
