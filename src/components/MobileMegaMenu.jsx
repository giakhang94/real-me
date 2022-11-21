import { AiFillCloseCircle } from 'react-icons/ai';
function MobileMegaMenu({ closeMobieMenu }) {
    return (
        <div className="laptop:hidden">
            <div className="mobile-mega__menu pl-3 pt-3 pb-10 flex-col absolute w-[250px] border shadow-md top-full left-0 z-[10000000000] bg-white">
                <span
                    className="flex items-center space-x-5 mb-2 cursor-pointer hover:font-bold"
                    onClick={closeMobieMenu}
                >
                    <AiFillCloseCircle className="text-red-300 hover:text-red-600" />
                    <span>Close</span>
                </span>
                <div className="mobile-row1">
                    <h4 className="mobile-mega__title text-lg font-bold mt-2">Homes for sale</h4>
                    <ul className="mobile-mega__container cursor-pointer">
                        <li className="mobile-mega__item text-sm py-1 pl-2">Homes For Sale</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">New home consstruction</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">Forceclosure Homes</li>
                    </ul>
                </div>
                <div className="mobile-row1">
                    <h4 className="mobile-mega__title text-lg font-bold mt-2">Homes for sale</h4>
                    <ul className="mobile-mega__container cursor-pointer">
                        <li className="mobile-mega__item text-sm py-1 pl-2">Homes For Sale</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">New home consstruction</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">Forceclosure Homes</li>
                    </ul>
                </div>
                <div className="mobile-row1">
                    <h4 className="mobile-mega__title text-lg font-bold mt-2">Homes for sale</h4>
                    <ul className="mobile-mega__container cursor-pointer">
                        <li className="mobile-mega__item text-sm py-1 pl-2">Homes For Sale</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">New home consstruction</li>
                        <li className="mobile-mega__item text-sm py-1 pl-2">Forceclosure Homes</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default MobileMegaMenu;
