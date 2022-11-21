import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase';

function Sale() {
    const [isLoading, setIsLoading] = useState(true);
    const [saleData, setSaleData] = useState([]);
    const [lastListing, setLastListing] = useState({});
    useState(() => {
        async function fetchData() {
            try {
                const ref = collection(db, 'listings');
                const q = query(ref, where('type', '==', 'sell'), orderBy('timestamp', 'desc'), limit(8));
                const docSnap = await getDocs(q);
                const lastSnap = docSnap.docs[docSnap.docs.length - 1];
                const list = [];
                docSnap.forEach((sale) => {
                    return list.push({
                        data: sale.data(),
                        id: sale.id,
                    });
                });
                setLastListing(lastSnap);
                setSaleData(list);
                setIsLoading(false);
            } catch (error) {
                toast.error(error.code);
            }
        }
        fetchData();
    }, []);
    async function fetchMoreRent() {
        try {
            const ref = collection(db, 'listings');
            const q = query(
                ref,
                where('type', '==', 'sell'),
                orderBy('timestamp', 'desc'),
                limit(4),
                startAfter(lastListing),
            );
            const docSnap = await getDocs(q);
            const lastSnap = docSnap.docs[docSnap.docs.length - 1];
            const list = [];
            docSnap.forEach((sale) => {
                return list.push({
                    data: sale.data(),
                    id: sale.id,
                });
            });
            setLastListing(lastSnap);
            setSaleData((prev) => [...prev, ...list]);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.code);
        }
    }
    return (
        <div>
            <h1 className="text-2xl text-center font-bold my-6">Places For sale</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <ul className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 smallmobile:grid-cols-1">
                        {saleData.map((sale) => {
                            return <ListingItem id={sale.id} data={sale.data} />;
                        })}
                    </ul>
                    {!!lastListing && (
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => {
                                    fetchMoreRent();
                                }}
                                className="bg-blue-500 text-white font-bold py-1 px-2 text-center"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
            <p className="mt-6 text-center font-bold">Oh! That's all for today. Please comeback later..</p>
        </div>
    );
}
export default Sale;
