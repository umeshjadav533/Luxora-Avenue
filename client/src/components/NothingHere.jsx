import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { Link } from 'react-router-dom';

const NothingHere = ({title1='', title2=''}) => {
    const { assets } = useContext(StoreContext);
    return (
        <div className="w-full flex flex-col-center-property gap-5">
            <div className="font-bold flex-col-center-property">
                <h2 className="roker-font text-4xl">{title1}</h2>
                <h2 className="roker-font text-xl">{title2}</h2>
            </div>
            <ul className="w-[30vw] flex flex-col gap-2 text-white">
                {assets.navigationBarLink.map((item, index) => (
                    <Link to={`/${item.link}`} key={index}>
                        <li className="bg-black hover:opacity-80 rounded-full text-center p-2 cursor-pointer text-sm">
                            SHOP {item.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default NothingHere
