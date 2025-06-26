import RatingStars from "./RatingStars"

function ReviewCard ({rating}) {

    return (

        <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
            
            <div className="flex items-center gap-4">
                <img className="h-9 w-9 rounded-full object-fit" src={rating?.user?.image ? rating?.user?.image : 
                    `https://api.dicebear.com/5.x/initials/svg?seed=${rating?.user?.firstName} ${rating?.user?.lastName}`} />

                <div className="flex flex-col">
                    <p className="font-semibold text-richblack-5">{`${rating?.user?.firstName} ${rating?.user?.lastName}`}</p>
                    <p className="text-[12px] font-medium text-richblack-500">{rating?.course?.name}</p>
                </div>
            </div>

            <p className="font-medium text-richblack-25">
                {
                    rating?.review.split(" ").length > 15 ? (
                        `${rating.review.split(" ").slice(0,15).join(" ")}...`
                    ):(
                        `${rating?.review}`
                    )
                } 
            </p>

            <RatingStars Review_Count={rating?.rating}/>
        </div>
    )
}

export default ReviewCard