import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { MdLocationOn } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';
import { GiBathtub } from 'react-icons/gi';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
function ListingItem({ data, id }) {
    return (
        <li className="relative  bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
            <Link className="contents" to={`/category/${data.type}/${id}`}>
                <img
                    src={data.imgUrls[0]}
                    alt=""
                    loading="lazy"
                    className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-150 ease-in"
                />
                <Moment
                    toNow
                    className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase font-bold rounded-md px-2 py-1 shadow-lg"
                >
                    {data.timestamp.toDate()}
                </Moment>
                <div className="w-full p-[10px]">
                    <div className="flex items-center space-x-1">
                        <MdLocationOn className="h-4 w-4 text-green-600" />
                        <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{data.address}</p>
                    </div>
                    <p className="font-semibold mt-2 text-lg ">{data.name}</p>
                    <p className="font-semibold mt-2 text-lg text-[#457b9d]">
                        $
                        {data.offer
                            ? data.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : data.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {data.type === 'sell' ? '' : '/month'}
                    </p>
                    <div className="flex items-center justify-between mt-[10px] space-x-3">
                        <div className="bahs-beds flex items-center space-x-2">
                            <span className="bahs-beds flex items-center space-x-1 text-xs">
                                <span className="text-xs">{data.bedrooms}</span>
                                <span className="flex items-center font-bold text-xs">
                                    <FaBed />
                                </span>
                            </span>
                            <span className="bahs-beds flex items-center space-x-1 text-xs">
                                <span className="text-xs">{data.baths}</span>
                                <span className="flex items-center font-bold text-xs">
                                    <GiBathtub />
                                </span>
                            </span>
                        </div>
                        <div className="butons flex items-center text-xs space-x-3">
                            <AiTwotoneEdit />
                            <AiFillDelete />
                        </div>
                    </div>
                </div>
            </Link>
            <p></p>
        </li>
    );
}
export default ListingItem;