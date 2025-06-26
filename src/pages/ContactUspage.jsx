import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/core/ContactUs/ContactDetails"
import ContactForm from "../components/core/ContactUs/ContactForm"

function ContactUspage () {

    return (

        <div className="bg-richblack-900 w-full">

            <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">

                <ContactDetails/>

                <ContactForm/>

            </div>

            <div className="flex flex-col gap-y-20 my-20">

                <h2 className="text-center text-4xl font-semibold mt-2 text-white ">Reviews from other learners</h2>

                <ReviewSlider/>
            </div>

            <Footer/>
            
        </div>
    )
}

export default ContactUspage