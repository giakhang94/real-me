import spinner from '../assets/images/spinner.svg';
function Spinner() {
    return (
        <div className="spinner h-screen w-full  flex justify-center items-center bg-black bg-opacity-30 z-50 fixed top-0 left-0 right-0 bottom-0">
            <div className="spinner__img ">
                <img src={spinner} alt=" " className="spinner__img-img bg-transparent" />
            </div>
        </div>
    );
}

export default Spinner;
