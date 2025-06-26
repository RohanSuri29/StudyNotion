import { useEffect, useState } from "react"
import { allRatings } from "../../services/Operations/ratingsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/free-mode";

function ReviewSlider(){

    const [ratings , setRatings] = useState([]);

    async function getRatings() {

        const result = await allRatings()
        setRatings(result);
    }

    useEffect(() => {
        getRatings();
    },[])

    return (

        <div className="my-[10px] h-[184px] max-w-maxContentTab lg:max-w-full -mt-6">
            {
                ratings.length > 0 ? (

                    <Swiper
                        spaceBetween={25}
                        slidesPerView={2}
                        breakpoints={{640: {slidesPerView: 4}}}
                        loop={true}
                        modules={[FreeMode , Pagination , Autoplay]}
                        autoplay={{delay:1500 , disableOnInteraction: false}}
                        className="w-[99%] mx-auto mySwiper">
                        {
                            ratings.map((rating , index) => (
                                
                                <SwiperSlide key={index}>
                                    <ReviewCard rating={rating}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                ) : (
                    <p className="text-xl text-richblack-5 text-center">No reviews found</p>
                )
            }

        </div>
    )
}

export default ReviewSlider