function Footer() {
    return (
        <div className="footer py-3 mt-6 text-sm w-full flex flex-col justify-center items-center bg-slate-800 text-white">
            <p className="p-1">RealMe Project - Realtor.com clone</p>
            <p className="p-1">Khang Nguyen - ngk.khang94@gmail.com </p>
            <a
                className="text-xs p-1 underline text-blue-400"
                href="https://www.udemy.com/course/reactjs-firebase-project/"
            >
                Learnt from Dr.Sahand Ghavidel on Udemy
            </a>
        </div>
    );
}

export default Footer;
