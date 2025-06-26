import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/Operations/ratingsApi";
import { useEffect } from "react";
import ReactStars from 'react-rating-stars-component';

function CourseReviewModal({setReviewModal}) {

    const {user} = useSelector((state) => state.profile);
    const {courseEntireData} = useSelector((state) => state.viewCourse);
    const {token} = useSelector((state) => state.auth);
    const {register , handleSubmit , formState:{errors} , setValue} = useForm();

    useEffect(() => {
        setValue("rating" , 0)
        setValue("review", "")
    },[])

    async function submitHandler(data) {
       
        await createRating({courseId:courseEntireData?._id , rating:data.rating , review:data.review } , token);

        setReviewModal(false)
    }

    function ratingChanged(newRating) {
        setValue("rating" , newRating);
    }

    return (

        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
            
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                {/* Modal Heading */}
                <div className="flex items-center justify-between bg-richblack-700 p-5">

                    <p className="text-xl font-semibold text-richblack-5">Add Review</p>

                    <button onClick={() => setReviewModal(false)}>
                        <RxCross2 className="text-2xl text-richblack-5"/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">

                    <div className="flex items-center justify-center gap-x-4">
                        <img src={user?.image}  className="aspect-square w-[50px] rounded-full object-cover"/>

                        <div className="flex flex-col">
                            <p className="font-semibold text-richblack-5">{`${user?.firstName} ${user?.lastName}`}</p>
                            <p className="text-sm text-richblack-5">Posting Publicly</p>
                        </div>
                    </div>

                    <form className="mt-6 flex flex-col items-center" onSubmit={handleSubmit(submitHandler)}>

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                        
                        <input type="hidden" {...register("rating", { required: true })} />

                        <div className="flex w-11/12 flex-col space-y-2">
                            <label htmlFor="review">
                                <p className="text-sm text-richblack-5">Add Your Experience<span className="text-pink-200">*</span></p>
                            </label>
                            <textarea className="resize-x-none min-h-[130px] w-full  rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" name="review" id="review" placeholder="Add Your Experience" {...register("review" , {required:true})}/>
                            {
                                errors.review && (<span className="ml-2 text-xs tracking-wide text-pink-200">Please fill the required fields</span>)
                            }
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                            
                            <button className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                                onClick={() => setReviewModal(false)}
                            >
                                Cancel
                            </button>

                            <IconBtn text="Save" type="submit" customClasses="justify-center"/>
                        </div>
                        
                    </form>
                </div>
    
            </div>

        </div>
    )
}

export default CourseReviewModal