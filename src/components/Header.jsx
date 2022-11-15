function Header() {
    return (
        <>
            <div className="header">
                <div className="header__left">
                    <div className="header__left-logo">
                        <img
                            className="logo__img"
                            src={'https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'}
                            alt=""
                        />
                    </div>
                </div>
                <div className="header__right">
                    <ul className="header__right-menu">
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
                        <li className="menu__item">Officer</li>
                    </ul>
                    <div className="menu__login">
                        <span className="login__item login__signIn">Sig In</span>
                        <span className="login__item login__signUp">Sign Up</span>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;