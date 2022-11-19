import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { FcHome } from 'react-icons/fc';
import {
    collection,
    deleteDoc,
    doc,
    documentId,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem.jsx';

function Profile() {
    const auth = getAuth();
    const nameInputRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [changeDetail, setChangeDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: 'Khang111', email: 'ngk.khang94@gmail.com111' });
    const { name, email } = formData;
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser; //trong course thì hướng dẫn xài auth.currentUser
        if (!!user) {
            setFormData({ name: user.displayName, email: user.email });
        }
    }, []);
    const handleSignOut = async () => {
        const auth = getAuth();
        alert('tao');
        try {
            await signOut(auth);
            navigate('/');
            toast.success('You are now logged out');
        } catch (error) {
            toast.error(error.code);
        }
    };
    const handleChangeName = (e) => {
        setIsEdit(!isEdit);
        nameInputRef.current.disabled = isEdit;
    };
    const handleSetNewName = async () => {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { ...auth.currentUser, displayName: name });
        //update profile chỉ sửa trên current user của auth;
        //nó k cập nhật trên table users đã tạo ở các bài trước
        //=> cần updateDoc để update luôn cái đó
        //(update k ghi đề toàn bộ đưa cái key nào thì update cái key đó thôi, set ghi đè hết)
        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            displayName: name,
        });

        setIsEdit(!isEdit);
    };
    //xu ly cancel thao tac edit displayName
    const handleCancel = () => {
        setFormData((prev) => {
            return { ...prev, name: auth.currentUser.displayName };
        });
        setIsEdit(!isEdit);
    };
    useEffect(() => {
        async function fetchUserListings() {
            //tạo ref dẫn tới table cần lấy
            // const ref = collection(db, 'listings');
            // const q = query(ref, where('userId', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
            // const querySnap = await getDocs(q);
            // let listing = [];
            const listingRef = collection(db, 'listings');
            const q = query(listingRef, where('userId', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
            const querySnap = await getDocs(q);
            let listing = [];
            // console.log('tao daay', querySnap.json());
            //getDocs tra ve 1 promise resolve 1 object (bắt bằng await gắn vào querySnap)
            //dùng forEach lấy ra từng cái rồi nhận data của nó bằng method .data()
            querySnap.forEach((doc) => {
                return listing.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListingData(listing);
            // console.log(listing);
            setIsLoading(false);
        }
        fetchUserListings();
    }, [auth.currentUser.uid]);
    async function onDelete(itemID) {
        if (window.confirm('Are you sure delete it?')) {
            console.log(itemID);
            await deleteDoc(doc(db, 'listings', itemID));
            const updatedListings = listingData.filter((listing) => {
                return listing.id !== itemID;
            });
            setListingData(updatedListings);
        }
    }
    function onEdit(itemID) {
        navigate(`/edit-listing/${itemID}`);
    }
    return (
        <>
            <div className="profile min-w-96 w-2/4 mx-auto">
                <h1 className="profile__title text-3xl text-center my-6 font-bold tao">My Profile</h1>
                <div className="profile__form">
                    <form>
                        <input
                            ref={nameInputRef}
                            type="text"
                            className={`name w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out mb-5 ${
                                isEdit ? 'bg-green-300' : 'bg-white'
                            }`}
                            value={name}
                            disabled
                            onChange={(e) => {
                                setFormData((prev) => {
                                    return { ...prev, name: e.target.value };
                                });
                            }}
                        />
                        <input
                            type="text"
                            className="email  w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition ease-in-out bg-white"
                            value={email}
                            disabled
                            readOnly={true}
                        />
                        <div className="edit flex justify-between items-center py-1 px-1">
                            <p className="text-sm px-1 cursor-pointer" onClick={handleChangeName}>
                                Change your name?
                                {!isEdit ? (
                                    <span className="text-red-600 ml-1">Edit</span>
                                ) : (
                                    <>
                                        <span className="text-green-600 ml-1" onClick={handleSetNewName}>
                                            Apply
                                        </span>
                                        <span className="text-red-600 mx-1" onClick={handleCancel}>
                                            Cancel
                                        </span>
                                    </>
                                )}
                            </p>
                            <p className="text-sm px-1 text-blue-500 cursor-pointer" onClick={handleSignOut}>
                                Sign out
                            </p>
                        </div>
                    </form>
                    <Link to="/create-listing">
                        <button
                            type="submit"
                            className="w-full my-2 flex items-center justify-center bg-blue-500 text-white text-bold py-1 rounded"
                        >
                            <FcHome className="mr-2" />
                            SELL OR RENT YOUR HOME
                        </button>
                    </Link>
                </div>
            </div>
            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!isLoading && listingData.length > 0 && (
                    <>
                        <h2 className="text-2xl text-bold text-center">My Listing</h2>
                        <ul className="grid smallmobile:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4">
                            {listingData.map((item) => {
                                return (
                                    <ListingItem
                                        key={item.id}
                                        id={item.id}
                                        data={item.data}
                                        onDelete={() => {
                                            onDelete(item.id);
                                        }}
                                        onEdit={() => {
                                            onEdit(item.id);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}

export default Profile;
