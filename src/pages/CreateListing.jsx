import { useState } from 'react';

function CreateListing() {
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
    });
    const { type, name, bedrooms, baths, parking, furnished, address, description, offer, regularPrice, discount } =
        formData;
    const onChange = () => {};
    return (
        <div className="listing max-w-md px-2 mx-auto my-5">
            <h1 className="text-3xl text-center text-bold">Create a Listing</h1>
            <form action="">
                <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="sell-rent space-x-6 flex justify-center items-center">
                    <button
                        type="button"
                        id="type"
                        value="sale"
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
                        value="sale"
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
                    minLenght="10"
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
                            requier
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
                            requier
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
                        id="furnished"
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
                <div className="furnished space-x-6 flex justify-center items-center">
                    <button
                        type="button"
                        id="type"
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
                        id="type"
                        value={false}
                        onClick={onChange}
                        className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
                    className="border border-gray-300 px-2 py-1 text-gray-700 rounded bg-white w-full transition duration-150 ease-in-out focus:text-gray-700 focus:outline-slate-600 mb-6"
                    value={address}
                    onChange={onChange}
                    placeholder="Address"
                    required
                />
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
                            id="bedrooms"
                            value={regularPrice}
                            onChange={onChange}
                            min="50"
                            max="1000"
                            requier
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
                            id="bedrooms"
                            value={discount}
                            onChange={onChange}
                            min="5"
                            max="1000"
                            requier
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
                        className="mb-6 mt-2 border border-gray-300 p-2 rounded "
                        type="file"
                        multiple
                        required
                        id="images"
                        onChange={onChange}
                        accept=".jpg, .png, .jpeg"
                    />
                </div>
                <button
                    type="submit"
                    className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg text-bold"
                >
                    CREATE LISTING
                </button>
            </form>
        </div>
    );
}
export default CreateListing;
