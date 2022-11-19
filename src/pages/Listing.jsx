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

function Listing() {
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
                {listingData.imgUrls.map((img) => (
                    <SwiperSlide>
                        <div
                            className="w-full overflow-hidden h-[300px]"
                            style={{
                                background: `url(${img}) center no-repeat`,
                            }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className="share-btn"
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
            <div className="flex items-center">
                <div className="listing-infomation flex flex-col p-5 laptop:w-2/4 tablet:w-full mobile:w-full smallmobile:w-full">
                    <p className="text-3xl text-blue-800 font-bold mb-6">{listingData.name}</p>
                    <p className="flex items-center mb-6">
                        <MdLocationPin className="text-green-600 mr-1" />
                        <span className="text-md text-gray-600 font-bold">{listingData.address}</span>
                    </p>
                    <div className="for-rent-for-sale flex space-x-2 mb-6">
                        <p className="w-2/4 bg-red-800 text-white font-bold text-lg rounded-md py-1 text-center">{`For ${listingData.type}`}</p>
                        {listingData.type === 'rent' && (
                            <p className="w-2/4 bg-green-800 text-white font-bold text-lg rounded-md py-1 text-center">
                                ${`${listingData.discount} discount`}
                            </p>
                        )}
                    </div>
                    <p className="mb-6">
                        <span className="font-bold">Description - </span>
                        <span>{listingData.description}</span>
                    </p>
                    <div className="flex justify-between mb-6">
                        <p className="flex space-x-2 items-center text-sm font-bold">
                            <FaBed />
                            <span>{listingData.bedrooms} beds</span>
                        </p>
                        <p className="flex space-x-2 items-center text-sm font-bold">
                            <GiBathtub />
                            <span>{listingData.bedrooms} baths</span>
                        </p>
                        <p className="flex space-x-2 items-center text-sm font-bold">
                            <FaParking />
                            <span>{listingData.bedrooms} Parking</span>
                        </p>
                        <p className="flex space-x-2 items-center text-sm font-bold">
                            <BsEmojiSunglassesFill />
                            <span>{listingData.bedrooms} Furnished</span>
                        </p>
                    </div>
                    <p className="font-bold cursor-pointer text-white text-center text-lg bg-blue-600 rounded-md py-2 w-full">
                        CONTACT LANDLORD
                    </p>
                </div>
                <div className="listing-googlemaps flex flex-col p-5 laptop:w-2/4 tablet:w-full mobile:w-full smallmobile:w-full">
                    google maps
                </div>
            </div>
        </div>
    );
}

export default Listing;
