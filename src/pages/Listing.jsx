import { doc, getDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import { MdLocationPin } from 'react-icons/md';
import { FaBed, FaParking } from 'react-icons/fa';
import { GiBathtub } from 'react-icons/gi';
import { BsEmojiSunglassesFill } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getAuth } from 'firebase/auth';
import Contact from '../components/Contact';
//import thw vien google map react-leaflet
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

function Listing() {
    const auth = getAuth();
    //contact landlord
    const [contactLandLord, setContactLandLord] = useState(false);
    //khai bao swiper de lam slier
    SwiperCore.use(Autoplay, Navigation, Pagination);
    const params = useParams();
    //xử lý nhấn nút share hiện thông báo đã copy link trong 2 giây
    const [isClickCopy, setIsClickCopy] = useState(false);
    const [listingData, setListingData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchListing() {
            try {
                const listing = await getDoc(doc(db, 'listings', params.listingId));
                setListingData({ ...listing.data() });
                setIsLoading(false);
            } catch (error) {
                toast.error(error.code);
            }
        }
        fetchListing();
    }, [params.listingId]);
    //xử lý event nhấn send email sẽ hiện lại nút contact và ẩn component
    const handleShowContactBtn = () => {
        setContactLandLord(false);
    };
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: 'progressbar' }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}
            >
                {listingData.imgUrls.map((img, index) => (
                    <SwiperSlide key={index + 'swipe'}>
                        <div className="w-full overflow-hidden h-[320px]">
                            <div
                                key={index + 'img'}
                                className="h-full w-full"
                                style={{
                                    background: `url(${img}) center`,
                                    backgroundSize: 'cover',
                                }}
                            >
                                <div className="backdrop-blur-sm flex justify-center h-full">
                                    <img src={img} alt="" className="object-contain" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className="share-btn z-[99999999999999999999999] fixed top-8 right-[5%]"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setIsClickCopy(true);
                    setTimeout(() => {
                        setIsClickCopy(false);
                    }, 2000);
                }}
            >
                {isClickCopy && (
                    <span className="py-1 px-2 transition-all duration-150 bg-gray-600 opacity-60 text-white font-bold text-lg rounded fixed right-[5%] top-[10%]">
                        Link copied!
                    </span>
                )}
                <MdContentCopy className="cursor-pointer bg-slate-300 opacity-50 text-gray-700 font-bold text-3xl rounded-md fixed top-8 right-[5%]" />
            </div>
            <div className="listing-info flex laptop:mx-20 tablet:mx-20 mobile:mx-5 smallmobile:mx-5 items-center laptop:flex-row tablet:flex-col mobile:flex-col smallmobile:flex-col">
                <div className="shadow shadow-gray-300 rounded-md listing-infomation flex flex-col p-5 laptop:w-2/4 tablet:w-full mobile:w-full smallmobile:w-full">
                    <p className="tablet:text-2xl laptop:text-3xl mobile:text-md smallmobile:text-md text-blue-800 font-bold laptop:mb-6 tablet:mb-6 mobile:mb-2 smallmobile:mb-2">
                        {listingData.name}
                    </p>
                    <p className="flex items-center laptop:mb-6 tablet:mb-6 mobile:mb-2 smallmobile:mb-2 tablet:text-lg laptop:text-lg mobile:text-xs smallmobile:text-xs">
                        <MdLocationPin className="text-green-600 mr-1" />
                        <span className="text-md text-gray-600 font-bold">{listingData.address}</span>
                    </p>
                    <div className="for-rent-for-sale flex space-x-2 laptop:mb-6 tablet:mb-6 mobile:mb-2 smallmobile:mb-2">
                        <p className="w-2/4 bg-red-800 text-white font-bold text-lg rounded-md py-1 text-center">{`For ${listingData.type}`}</p>
                        {listingData.type === 'rent' && (
                            <p className="w-2/4 bg-green-800 text-white font-bold text-lg rounded-md py-1 text-center">
                                ${`${listingData.discount} discount`}
                            </p>
                        )}
                    </div>
                    <p className="laptop:mb-6 tablet:mb-6 mobile:mb-2 smallmobile:mb-2 tablet:text-md laptop:text-md mobile:text-sm smallmobile:text-sm">
                        <span className="font-bold ">Description - </span>
                        <span>{listingData.description}</span>
                    </p>
                    <div className="flex justify-between laptop:mb-6 tablet:mb-6 mobile:mb-2 smallmobile:mb-2 tablet:text-md laptop:text-md mobile:text-xs smallmobile:text-xs">
                        <p className="flex space-x-2 items-center  font-bold">
                            <FaBed />
                            <span>{listingData.bedrooms} beds</span>
                        </p>
                        <p className="flex space-x-2 items-center  font-bold">
                            <GiBathtub />
                            <span>{listingData.bedrooms} baths</span>
                        </p>
                        <p className="flex space-x-2 items-center  font-bold">
                            <FaParking />
                            <span>{listingData.bedrooms} Parking</span>
                        </p>
                        <p className="flex space-x-2 items-center  font-bold">
                            <BsEmojiSunglassesFill />
                            <span>{listingData.bedrooms} Furnished</span>
                        </p>
                    </div>
                    {contactLandLord && (
                        <Contact listingData={listingData} handleShowContactBtn={handleShowContactBtn} />
                    )}
                    {!contactLandLord && (
                        <p
                            onClick={() => {
                                if (auth.currentUser == null) {
                                    toast.info('Please sign in first');
                                } else {
                                    if (auth.currentUser.uid !== listingData.userId) {
                                        setContactLandLord(true);
                                    } else {
                                        toast.info('You are funny');
                                    }
                                }
                            }}
                            className="font-bold cursor-pointer text-white text-center text-lg bg-blue-600 rounded-md py-2 w-full"
                        >
                            CONTACT LANDLORD
                        </p>
                    )}
                </div>
                <div className=" rounded-lg p-5 h-[350px]  z-10 overflow-x-hidden laptop:w-2/4 tablet:w-full mobile:w-full smallmobile:w-full">
                    <MapContainer
                        center={[listingData.geolocation.lat, listingData.geolocation.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[listingData.geolocation.lat, listingData.geolocation.lng]}>
                            <Popup>{listingData.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Listing;
