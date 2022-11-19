import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

function Contact({ listingData, handleShowContactBtn = () => {} }) {
    const [authData, setAuthData] = useState({});
    const [message, setMassage] = useState('');
    useEffect(() => {
        async function getAuthData() {
            const getAuthData = await getDoc(doc(db, 'users', listingData.userId));
            setAuthData(getAuthData.data());
        }
        getAuthData();
    }, []);
    return (
        <div className="contact">
            <p className="text-sm text-gray-500">Send message to {authData.displayName} for more information</p>
            <textarea
                value={message}
                onChange={(e) => {
                    setMassage(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="8"
                placeholder="Send landlord message! Click Send button to automatically send by your email"
            />
            <a
                href={`mailto:${authData.email}?Subject=${listingData.name}&body=${message}`}
                onClick={handleShowContactBtn}
            >
                <p className="w-full text-white text-center font-bold text-lg bg-blue-600 py-2 rounded-md cursor-pointer my-2">
                    SEND BY EMAIL TO LANDLORD
                </p>
            </a>
        </div>
    );
}

export default Contact;
