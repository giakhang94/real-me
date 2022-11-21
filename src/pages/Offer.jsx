import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase';

function Offer() {
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListing] = useState([]);
    const [lastFetchedListings, setLastFetchedListings] = useState(null);
    console.log(listings);
    useEffect(() => {
        async function fetchListings() {
            try {
                //get reference
                const ref = collection(db, 'listings');
                //create query
                const q = query(ref, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(8));
                //execute the query
                const list = [];
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListings(lastVisible);
                querySnap.forEach((doc) => {
                    return list.push({
                        data: doc.data(),
                        id: doc.id,
                    });
                });
                console.log(list);
                setListing(list);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);
    async function onFetchMore() {
        try {
            //get reference
            const ref = collection(db, 'listings');
            //create query
            const q = query(
                ref,
                where('offer', '==', true),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListings),
                limit(4),
            );
            //execute the query
            const list = [];
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedListings(lastVisible);
            querySnap.forEach((doc) => {
                return list.push({
                    data: doc.data(),
                    id: doc.id,
                });
            });
            setListing((prev) => [...prev, ...list]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h2 className="text-3xl text-center font-bold my-6">Homes with Offer</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="main">
                        <ul className="grid tablet:grid-cols-3 laptop:grid-cols-5 mobile:grid-cols-1 smallmobile:grid-cols1">
                            {listings.map((offer) => {
                                return <ListingItem id={offer.id} data={offer.data} key={offer.id} />;
                            })}
                        </ul>
                    </div>
                    {lastFetchedListings && (
                        <div
                            onClick={() => {
                                onFetchMore();
                            }}
                            className="flex justify-center items-center"
                        >
                            <button className="bg-blue-500 py-1 px-3 text-white font-bold">Load More</button>
                        </div>
                    )}
                </>
            )}
            {lastFetchedListings === undefined ? (
                <p className="mt-6 text-center font-bold">Oh! That's all for today. Please comeback later..</p>
            ) : (
                ''
            )}
        </div>
    );
}

export default Offer;
