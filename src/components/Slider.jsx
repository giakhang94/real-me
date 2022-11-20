import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { list } from 'firebase/storage';
import ClickToView from './ClicktoView';
function SliderMe() {
    const navigate = useNavigate();
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [listingsData, setListingsData] = useState([]);
    useEffect(() => {
        async function getAllListings() {
            let listings = [];
            const ref = collection(db, 'listings');
            const docSnap = await getDocs(ref);
            docSnap.forEach((listing) => {
                // console.log('listing', listing.id);
                listings = [...listings, { data: listing.data(), id: listing.id }];
            });
            setListingsData(listings);
        }
        getAllListings();
    }, []);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    });
    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
    };
    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '5px',
    };
    const handleNavigate = (type, id) => {
        navigate(`${type}/${id}`);
    };
    return (
        <div className="sliderMe w-full h-[300px] block slider-wrapper">
            <Slider {...settingsMain} asNavFor={nav2} ref={(slider) => setSlider1(slider)}>
                {listingsData.map((listing, index) => {
                    return (
                        <div key={index + 'main'}>
                            <div key={listing.id} style={{ background: `url(${listing.data.imgUrls[0]}) center` }}>
                                <img
                                    src={listing.data.imgUrls[0]}
                                    alt=""
                                    className="slick-slide-image h-[350px] w-full object-contain backdrop-blur-sm"
                                />
                            </div>
                            <ClickToView name={listing.data.name} id={listing.id} type={listing.data.type} />
                        </div>
                    );
                })}
            </Slider>
            <div className="thumbnail-slider-wrap">
                <Slider {...settingsThumbs} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
                    {listingsData.map((listing, index) => {
                        return (
                            <div className="slick-slider w-[100px] rounded-md p-2" key={index + 'thumb'}>
                                <img
                                    className="slick-slide-image w-[100px] h-[100px] object-cover  rounded-md"
                                    src={listing.data.imgUrls[0]}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default SliderMe;
