const REACT_APP_BASE_URL = "https://studynotion-4hsu.onrender.com/api/v1";
const BASE_URL = REACT_APP_BASE_URL;

//auth endpoints
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// profile endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

//students enrolled endpoints --> pending
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

//courseEndpoints
export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}

// settings endpoints
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
  
// category page details
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// categories api
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// contactUs api
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

//Rsting and reviews endpoints
export const ratingsEndpoints = {
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
    DELETE_REVIEW_API: BASE_URL + "/course/deleteReview",
    AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",
    GET_COURSE_REVIEWS: BASE_URL + "/course/getCourseReviews"
}