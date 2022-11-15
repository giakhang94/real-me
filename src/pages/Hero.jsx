import SearchIcon from '@mui/icons-material/Search';

function Hero() {
    //https://static.rdc.moveaws.com/images/hero/default/2021-11/webp/hp-hero-desktop.webp
    return (
        <div className="hero">
            <div className="hero__img">
                <img
                    src="https://static.rdc.moveaws.com/images/hero/default/2021-11/webp/hp-hero-desktop.webp"
                    alt=""
                />
            </div>
            <div className="hero__content">
                <div className="hero__title">
                    <h2>To each their home.</h2>
                    <p>Lets find a home that's pefect for you</p>
                </div>
                <div className="hero__navbar">
                    <ul className="navbar__content">
                        <li className="navbar__item">BUY</li>
                        <li className="navbar__item">RENT</li>
                        <li className="navbar__item">SELL</li>
                        <li className="navbar__item">PRE-APPROVAL</li>
                        <li className="navbar__item">JUST SOLD</li>
                        <li className="navbar__item">HOME VALUE</li>
                    </ul>
                </div>
                <div className="hero__search">
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Address, School, City, Zip or Neighborhood"
                    />
                    <SearchIcon fontSize="medium" className="search__icon" />
                </div>
            </div>
        </div>
    );
}
export default Hero;
