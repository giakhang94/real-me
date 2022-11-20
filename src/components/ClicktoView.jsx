import { useState } from 'react';

function ClickToView({ type, id, name }) {
    const type1 = type;
    const name1 = name;
    const id1 = id;
    return (
        <a
            href={`/category/${type1}/${id1}`}
            className="bg-[#D92228] text-white font-bold text-lg py-1 px-2 rounded-md opacity-70 hover:opacity-100 z-5 cursor-pointer absolute top-[2%] left-[2%]"
        >
            Click {name1}
        </a>
    );
}
export default ClickToView;
