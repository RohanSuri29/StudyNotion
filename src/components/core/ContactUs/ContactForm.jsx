import ContactUsform from "../../common/ContactUsform"

function ContactForm() {

    return (

        <div className="lg:w-[60%]">
            
            <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">

                <h2 className="text-4xl leading-10 font-semibold text-richblack-5">
                    Got a Idea? We've got the skills. Let's team up
                </h2>

                <p>
                    Tell us more about yourself and what you're got in mind.
                </p>

                <div className="w-full mt-7">
                    <ContactUsform/>
                </div>
                
            </div>
        </div>
    )
}

export default ContactForm