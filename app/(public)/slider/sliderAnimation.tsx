'use client';
import { useState, useEffect } from 'react';

export default function SliderAnimation() {
    const [indexSlide, setIndexSlide] = useState<number>(0);
    const slides = ['devtest-media/slider-media/banner-main-1.webp', 'devtest-media/slider-media/banner-main-2.webp', 'devtest-media/slider-media/banner-main-3.webp'];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndexSlide((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div>
            <div className="slider__wrapper flex justify-center w-full h-150 bg-gray-200 overflow-hidden">
                <div className="relative flex justify-center align-middle slider-items w-full h-full">
                    <img
                        key={indexSlide}
                        src={`https://dev-magick-api.ru/` + slides[indexSlide]}
                        alt={slides[indexSlide]}
                        className="slider-item__img w-full h-auto animate-[fadeIn_1s_ease-in-out]"
                    />
                    <div className="point-items absolute flex row gap-5 bottom-10">
                        {slides.map((_, index) => (
                            <div key={index} className={`point-item ${indexSlide === index ? 'bg-white' : ''} w-3 h-3 rounded-[50%] border border-white shadow-2xl`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
