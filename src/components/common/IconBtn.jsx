
function IconBtn({text , disabled , children , onclick , outline = false , customClasses , type}) {

    return (

        <button disabled={disabled} onClick={onclick} className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}  cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:scale-95 transition-all duration-200 hover:bg-yellow-50/90 ${customClasses}`} type={type}>
           
           <span>{text}</span>

           {children && <span>{children}</span>}
        </button>
    )
}

export default IconBtn