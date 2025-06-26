import ContactUsform from "../../common/ContactUsform"

function ContactFormSection() {

    return (

        <div className="bg-richblack-900 w-full">
            
            <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">

                <h1 className="text-center text-4xl font-semibold mt-9">
                    Get in Touch
                </h1>

                <p className="text-center text-richblack-300 -mt-7">
                    We'd love to here for you, Please fill out this form.
                </p>

                <ContactUsform/>
            </div>
        </div>
    )
}

export default ContactFormSection