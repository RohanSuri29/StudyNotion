
function Stats() {

    const statsData = [
        {count:"5k" , label:"Active Students"},
        {count:"10+" , label:"Mentors"},
        {count:"200+" , label:"Courses"},
        {count:"50+" , label:"Awards"},
    ]
    
    return (

        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">

            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                {
                    statsData.map((stat , index) => (

                        <div key={index} className="flex flex-col py-10">

                            <h2 className="text-[30px] font-bold text-richblack-5">
                                {stat.count}
                            </h2>
                            <p className="font-semibold text-[16px] text-richblack-500">
                                {stat.label}
                            </p>

                        </div>

                    ))
                }
            </div>
            
        </div>
    )
}

export default Stats