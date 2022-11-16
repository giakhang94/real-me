import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Profile() {
    const nameInputRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
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
        setIsEdit(!isEdit);
    };
    //xu ly cancel thao tac edit displayName
    const handleCancel = () => {
        const auth = getAuth();
        setFormData((prev) => {
            return { ...prev, name: auth.currentUser.displayName };
        });
        setIsEdit(!isEdit);
    };
    return (
        <>
            <div className="profile min-w-96 w-2/4 mx-auto">
                <h1 className="profile__title text-3xl text-center my-6 font-bold">My Profile</h1>
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
                        '
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
                </div>
            </div>
        </>
    );
}

export default Profile;
