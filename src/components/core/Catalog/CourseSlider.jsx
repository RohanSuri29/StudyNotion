import { Swiper, SwiperSlide } from "swiper/react"
import CourseCard from "./CourseCard"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/free-mode";

function CourseSlider({courses}) {

    return (

        <div>
            {
                courses?.length > 0 ? (

                    <Swiper 
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{640: {slidesPerView: 3}}}
                        loop={true}
                        modules={[FreeMode , Pagination , Autoplay]}
                        autoplay={{delay:1500 , disableOnInteraction: false}}
                        className="max-h-[30rem] mySwiper">
                        {
                            courses.map((course , index) => (

                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"lg:h-[200px]"} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : (
                    <p className="text-xl text-richblack-5">No courses found</p>
                )
            }
        </div>
    )
}

export default CourseSlider