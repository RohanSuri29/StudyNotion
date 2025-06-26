
function Tab(props) {

    return (

        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]">
            
            {
                props.tabData.map( (tab) => (

                    <button key={tab.id} onClick={() => props.setAccountType(tab.type)} className={`${props.accountType === tab.type ? 
                    "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>
                        {tab.tabName}
                    </button>
                ))
            }
        </div>
    )
}

export default Tab