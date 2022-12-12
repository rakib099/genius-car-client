import React from 'react';
import './BannerItem.css';
import { Link } from 'react-router-dom';

const BannerItem = ({slide}) => {
    const {image, id, prev, next}   = slide;

    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
                <img src={image} alt="carousel-img" className="w-full rounded-lg" />
            </div>
            {/* Title */}
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                <h1 className='text-6xl font-bold text-white'>
                    Affordable <br />
                    Price for Car <br />
                    Servicing
                </h1>
            </div>
            {/* Text */}
            <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 top-2/4">
                <p className='text-xl text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
            </div>
            {/* Button */}
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
                <Link>
                    <button className="btn btn-warning mr-5">Warning</button></Link>
                <Link>
                    <button className="btn btn-outline btn-warning">Button</button>
                </Link>
            </div>
            {/* Prev/Next */}
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle btn-warning">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;