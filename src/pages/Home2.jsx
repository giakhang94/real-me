import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { list } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import SliderMe from '../components/Slider';
import { db } from '../firebase';

function Home2() {
    //offers
    const [offerListing, setOfferListing] = useState(null);
    useEffect(() => {
        async function fetchListings() {
            try {
                //get reference
                const ref = collection(db, 'listings');
                //create query
                const q = query(ref, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(4));
                //execute the query
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        data: doc.data(),
                        id: doc.id,
                    });
                });
                setOfferListing(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);
    //rent
    const [rentListing, setRentListing] = useState(null);
    // console.log(rentListing);
    useEffect(() => {
        async function fetchListings() {
            try {
                //get reference
                const ref = collection(db, 'listings');
                //create query
                const q = query(ref, where('type', '==', 'rent'), orderBy('timestamp', 'desc'), limit(4));
                //execute the query
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        data: doc.data(),
                        id: doc.id,
                    });
                });
                setRentListing(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);

    //sale
    const [saleListing, setSaleListing] = useState(null);
    // console.log(rentListing);
    useEffect(() => {
        async function fetchListings() {
            try {
                //get reference
                const ref = collection(db, 'listings');
                //create query
                // const q = query(ref, where('type', '==', 'sell'), orderBy('timestamp', 'desc'), limit(4));
                const query2 = query(ref, where('type', '==', 'sell'), orderBy('timestamp', 'desc'), limit(4));
                //execute the query
                const querySnap = await getDocs(query2);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        data: doc.data(),
                        id: doc.id,
                    });
                });
                setSaleListing(listings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);
    return (
        <div>
            <div className="block">
                <SliderMe className="block" />
            </div>
            <div>
                {!!offerListing && offerListing.length > 0 && (
                    <div className="mt-[210px] mb-6">
                        <h2 className="px-3 text-2xl mt-1 mb-2 font-bold">Recent Offers</h2>
                        <Link to="/offer">
                            <p
                                className="text-sm text-blue-500 mb-6
                             hover:text-blue-800 hover:font-bold px-3"
                            >
                                Show more offers
                            </p>
                        </Link>
                        <ul className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 smallmobile:grid-cols-1 mb-6">
                            {offerListing.map((offer) => {
                                return <ListingItem data={offer.data} id={offer.id} key={offer.id + 'offer'} />;
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                {!!rentListing && rentListing.length > 0 && (
                    <div className=" mb-6">
                        <h2 className="px-3 text-2xl mt-1 mb-2 font-bold">Recent Rents</h2>
                        <Link to="/">
                            <p
                                className="text-sm text-blue-500 mb-6
                             hover:text-blue-800 hover:font-bold px-3"
                            >
                                Show more rents
                            </p>
                        </Link>
                        <ul className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 smallmobile:grid-cols-1 mb-6">
                            {rentListing.map((rent) => {
                                return <ListingItem data={rent.data} id={rent.id} key={rent.id + 'rent'} />;
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                {!!saleListing && saleListing.length > 0 && (
                    <div className=" mb-6">
                        <h2 className="px-3 text-2xl mt-1 mb-2 font-bold">Recent Sales</h2>
                        <Link to="/">
                            <p
                                className="text-sm text-blue-500 mb-6
                             hover:text-blue-800 hover:font-bold px-3"
                            >
                                Show more sales
                            </p>
                        </Link>
                        <ul className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 smallmobile:grid-cols-1 mb-6">
                            {saleListing.map((sale) => {
                                return <ListingItem data={sale.data} id={sale.id} key={sale.id + 'sale'} />;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home2;
