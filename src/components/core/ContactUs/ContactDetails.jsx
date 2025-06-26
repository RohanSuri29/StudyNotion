import { BiWorld } from "react-icons/bi"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { IoCall } from "react-icons/io5"

function ContactDetails() {

    const contactDetails = [

        {
            icon:<HiChatBubbleLeftRight size={25}/>,
            heading: "Chat with us",
            description: "Our friendly team is here to help.",
            details: "info@studynotion.com"
        },
        {
            icon: <BiWorld size={25}/>,
            heading: "Visit us",
            description: "Come and say hello at our office HQ.",
            details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            icon: <IoCall size={25}/>,
            heading: "Call us",
            description: "Mon - Fri From 8am to 5pm.",
            details: "+123 456 7869"
        }
    ]

    return (

        <div className="lg:w-[40%]">
            
            <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
                {
                    contactDetails.map( (element , index) => (
                        
                        <div key={index} className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">

                            <div className="flex flex-row items-center gap-3">
                                {element.icon}
                                <h2 className="text-lg font-semibold text-richblack-5">{element.heading}</h2>
                            </div>

                            <p className="font-medium">{element.description}</p>

                            <p className="font-semibold">{element.details}</p>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ContactDetails