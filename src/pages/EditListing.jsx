import { useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router';

function EditListing() {
    const inputFileRef = useRef();
    //tao nagative
    const navigate = useNavigate();
    //nhận id từ url
    const params = useParams();
    const newParams = { ...params };
    const Id = params.itemID;
    //tạo auth
    const auth = getAuth();
    //tạo hook để làm google map (kinh độ, vỹ độ)
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);
    const [listing, setListing] = useState({});
    const [imgUrls, setImgUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        baths: 1,
        parking: true,
        furnished: true,
        address: '',
        description: '',
        offer: true,
        regularPrice: 50,
        discount: 5,
        images: {},
        latitude: 0, //vỹ độ
        longitude: 0, //kinh độ
    });
    const {
        type,
        name,
        bedrooms,
        baths,
        parking,
        furnished,
        address,
        description,
        offer,
        regularPrice,
        discount,
        images,
        latitude,
        longitude,
    } = formData;
    //get document by ID from firebase
    useEffect(() => {
        setLoading(true);
        async function fetchUserFromID() {
            try {
                const docRef = doc(db, 'listings', params.itemID); //param tu useParams()
                const docSnap = await getDoc(docRef);
                setFormData((prev) => ({
                    ...prev,
                    ...docSnap.data(),
                }));
                setListing(docSnap.data());
                setLoading(false);
                if (!!docSnap.data() && docSnap.data().userId !== auth.currentUser.uid) {
                    toast.error('You can not edit dat ass');
                    navigate('/profile');
                }
            } catch (error) {
                toast.error(error.code);
                navigate('/profile');
            }
        }
        console.log('auth', auth.currentUser.uid);
        console.log('listing', listing.userId);
        fetchUserFromID();
    }, [auth.currentUser.userId]);
    useEffect(() => {}, []);
    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === 'true') {
            boolean = true;
            setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
            }));
        }
        if (e.target.value === 'false') {
            boolean = false;
            setFormData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
            }));
        }
        //files
        // console.log('etartgetfile', e.target.files);
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: e.target.files,
            }));
        }
        //text/boolean/number
        if (!e.target.files) {
            setFormData((prev) => ({
                ...prev,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (+discount > +regularPrice) {
            setLoading(false);
            toast.error('discount price needs to be less than regular price');
            return;
        }
        if (images.length > 6) {
            setLoading(false);
            toast.error('You uploaded more than 6 photos');
            return;
        }
        let geolocation = {};
        let location;
        if (geolocationEnabled) {
            const respone = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
            );
            const data = await respone.json();
            //hàm này làm theo chứ chưa xài được do k tao bill google cloud.
            //Từ từ gần đi PV thì tạo để làm CV, sau đó cancel
            //lấy kinh độ và vỹ độ
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;
            location = data.status === 'ZERO_RESULTS' && undefined;
            if (location === undefined || location.include('undefined')) {
                setLoading(false);
                toast.error('please enter a correct address');
                return;
            }
            //từ khúc này là nhập thủ công
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
        }
        //xong rồi qua xử lý up hình lên firebase

        //code firebase

        // code tay

        // console.log(inputFileRef.current.files.length);
        if (inputFileRef.current.files.length > 0) {
            async function storeImage(image) {
                return new Promise((resolve, reject) => {
                    const storage = getStorage();
                    const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                    const storageRef = ref(storage, filename);
                    const uploadTask = uploadBytesResumable(storageRef, image);
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                default:
                                    break;
                            }
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            reject(error);
                        },
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                resolve(downloadURL);
                            });
                        },
                    );
                });
            }
            //kiểm tra nêu có lỗi thì toast lỗi rồi ngưng code
            //đồng thời return imgUrls
            const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch((error) => {
                setLoading(false);
                toast.error('images not uploaded');
                return;
            });
            console.log('img', imgUrls);
            const formDataCopy = {
                ...formData,
                imgUrls,
                geolocation,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                timestamp: serverTimestamp(),
            };

            delete formDataCopy.images;

            !formDataCopy.offer && delete formDataCopy.discountedPrice;
            delete formDataCopy.latitude;
            delete formDataCopy.longitude;
            //tạo hàm addDoc để add data listing này thành 1 table mới trên firebase
            await updateDoc(doc(db, 'listings', params.itemID), formDataCopy);
            setLoading(false);
            toast.success('Data updated');
            navigate('/profile');
        } else {
            let oldImgUrls = [];
            oldImgUrls = [...listing.imgUrls];

            const formDataCopy = {
                ...formData,
                imgUrls: [...oldImgUrls],
                geolocation,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                timestamp: serverTimestamp(),
            };
            delete formDataCopy.images;
            !formDataCopy.offer && delete formDataCopy.discountedPrice;
            delete formDataCopy.latitude;
            delete formDataCopy.longitude;
            //tạo hàm addDoc để add data listing này thành 1 table mới trên firebase
            await updateDoc(doc(db, 'listings', params.itemID), formDataCopy);
            setLoading(false);
            toast.success('Data updated');
            navigate('/profile');
        }
    }
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="listing max-w-md px-2 mx-auto my-5">
            <h1 className="text-3xl text-center text-bold">Edit Listing</h1>
            <form action="" onSubmit={onSubmit}>
                <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="sell-rent space-x-6 flex justify-center items-center">
                    <button
                        type="button"
                        id="type"
                        value="sell"
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            type === 'rent' ? 'bg-white text-black' : 'bg-slate-600 text-white'
                        }`}
                    >
                        Sell
                    </button>
                    <button
                        type="button"
                        id="type"
                        value="rent"
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            type === 'sell' ? 'bg-white text-black' : 'bg-slate-600 text-white'
                        }`}
                    >
                        Rent
                    </button>
                </div>
                <p className="text-lg mt-6 font-semibold">Name</p>
                <input
                    type="text"
                    id="name"
                    className="border border-gray-300 px-2 py-1 text-gray-700 rounded bg-white w-full transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600 mb-6"
                    value={name}
                    onChange={onChange}
                    placeholder="Name"
                    maxLength="32"
                    minLength="10"
                    required
                />
                <div className="bed-bath-container flex space-x-6 mb-6">
                    <div>
                        <p className="bed text-lg font-semibold">Beds</p>
                        <input
                            className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600"
                            type="number"
                            id="bedrooms"
                            value={bedrooms}
                            onChange={onChange}
                            min="1"
                            max="50"
                            required
                        />
                    </div>
                    <div>
                        <p className="bed text-lg font-semibold">Baths</p>
                        <input
                            className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600"
                            type="number"
                            id="baths"
                            value={baths}
                            onChange={onChange}
                            min="1"
                            max="50"
                            required
                        />
                    </div>
                </div>
                <p className="text-lg font-semibold">Parking spot</p>
                <div className="parking-spot space-x-6 flex justify-center items-center mb-6">
                    <button
                        type="button"
                        id="parking"
                        value={true}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            parking === true ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        YES
                    </button>
                    <button
                        type="button"
                        id="parking"
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            parking === false ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        NO
                    </button>
                </div>
                <p className="text-lg font-semibold">Furnished</p>
                <div className="furnished space-x-6 flex items-center">
                    <button
                        type="button"
                        id="furnished"
                        value={true}
                        onClick={onChange}
                        className={`px-7 mb-6 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            furnished === true ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        YES
                    </button>
                    <button
                        type="button"
                        id="furnished"
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 mb-6 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            furnished === false ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        NO
                    </button>
                </div>
                <p className="text-lg  font-semibold">Address</p>
                <textarea
                    type="text"
                    id="address"
                    className="border border-gray-300 px-2 py-1 text-gray-700 rounded bg-white w-full transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600 mb-2"
                    value={address}
                    onChange={onChange}
                    placeholder="Address"
                    required
                />
                {!geolocationEnabled && (
                    <div className="flex space-x-6 mb-6">
                        <div className="">
                            <p>Latitude</p>
                            <input
                                className="p-2 border border-gray-300 bg-white text-md text-gray-700 rounded"
                                type="number"
                                id="latitude"
                                value={latitude}
                                onChange={onChange}
                                required
                                min="-90"
                                max="90"
                            />
                        </div>
                        <div className="">
                            <p>Longitude</p>
                            <input
                                className="p-2 border border-gray-300 bg-white text-md text-gray-700 rounded"
                                type="number"
                                id="longitude"
                                value={longitude}
                                onChange={onChange}
                                required
                                min="-180"
                                max="180"
                            />
                        </div>
                    </div>
                )}
                <p className="text-lg font-semibold">Description</p>
                <textarea
                    type="text"
                    id="description"
                    className="border border-gray-300 px-2 py-1 text-gray-700 rounded bg-white w-full transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600 mb-6"
                    value={description}
                    onChange={onChange}
                    placeholder="Description"
                    required
                />
                <p className="text-lg font-semibold">Offer</p>
                <div className="offer space-x-6 flex justify-center items-center mb-6">
                    <button
                        type="button"
                        id="offer"
                        value={true}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                            offer === true ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        YES
                    </button>
                    <button
                        type="button"
                        id="offer"
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full  ${
                            offer === false ? 'bg-slate-600 text-white' : 'bg-white text-black'
                        }`}
                    >
                        NO
                    </button>
                </div>
                <div className="flex space-x-6 mb-6 ">
                    <div>
                        <p className="bed text-lg font-semibold">Regular Price</p>
                        <input
                            className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600"
                            type="number"
                            id="regularPrice"
                            value={regularPrice}
                            onChange={onChange}
                            min="50"
                            max="1000"
                            required
                        />
                    </div>
                    {type === 'rent' ? (
                        <div>
                            <p className="bed text-lg font-semibold">Unit</p>
                            <div className="text-md w-full">$/Month</div>
                        </div>
                    ) : (
                        <div>
                            <p className="bed text-lg font-semibold">Unit</p>
                            <div className="text-md w-full">$</div>
                        </div>
                    )}
                </div>
                <div className="flex space-x-6 mb-6 ">
                    <div>
                        <p className="bed text-lg font-semibold">Discount</p>
                        <input
                            className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600"
                            type="number"
                            id="discount"
                            value={discount}
                            onChange={onChange}
                            min="5"
                            max="1000"
                            required
                        />
                    </div>
                    {type === 'rent' ? (
                        <div>
                            <p className="bed text-lg font-semibold">Unit</p>
                            <div className="text-md w-full">$/Month</div>
                        </div>
                    ) : (
                        <div>
                            <p className="bed text-lg font-semibold">Unit</p>
                            <div className="text-md w-full">$</div>
                        </div>
                    )}
                </div>
                <div className="upload">
                    <p className="bed text-lg font-semibold">Image</p>
                    <p className="text-sm text-gray-500">The first image will be the cover - max 6</p>
                    <input
                        ref={inputFileRef}
                        className="mb-6 mt-2 border border-gray-300 p-2 rounded "
                        type="file"
                        multiple
                        id="images"
                        onChange={onChange}
                        accept=".jpg, .png, .jpeg"
                    />
                </div>
                <button
                    type="submit"
                    className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg text-bold"
                >
                    UPDATE LISTING
                </button>
            </form>
        </div>
    );
}
export default EditListing;
