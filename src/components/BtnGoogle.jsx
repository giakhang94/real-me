import { FcGoogle } from 'react-icons/fc';
function BtnGoogle() {
    return (
        <button className="flex items-center justify-center h-11 w-full text-center text-white bg-red-600 rounded text-sm font-semibold">
            <span>
                <FcGoogle className=" text-lg mr-1 bg-white rounded-full p-1" />
            </span>
            <span>COUNTINUE WITH GOOGLE</span>
        </button>
    );
}

export default BtnGoogle;
