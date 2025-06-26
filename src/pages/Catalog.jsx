import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategoryDetails } from "../services/Operations/categoryApi";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import CourseCard from "../components/core/Catalog/CourseCard";
import { getCourseCategories } from "../services/Operations/courseDetails";

function Catalog() {

    const {catalogName} = useParams();
    const [categoryId , setCategoryId] = useState(null);
    const [catalogData , setCatalogData] = useState(null);
    const [active , setActive] = useState(1);
    const [newCourses , setNewCourses] = useState([]);
    const [popular , setPopular] = useState([]);

    async function getPageCategories() {

        try{

            const result = await getCourseCategories();

            const category_id = result.filter((category) => category.name.split(' ').join('-').toLowerCase() === catalogName)[0]._id;

            setCategoryId(category_id)
        }
        catch(error) {
            console.log(error)
        }
    }

    async function categoryDetails() {

        try{

            let result;
            if(categoryId) {
                result = await getCategoryDetails(categoryId);  
            }
            
            const courses = result?.selectedCategory?.Courses.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,15);
            const popular = result?.selectedCategory?.Courses.sort((a,b) => b.averageRating - a.averagerating).slice(0,20);
            setCatalogData(result);
            setNewCourses(courses);
            setPopular(popular);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPageCategories();
    },[catalogName])

    useEffect(() => {
        categoryDetails()
    },[categoryId])

    return (

        <div>

            {/* Hero Section */}
            <div className="box-content bg-richblack-800 px-4 mb-8">

                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">

                    <p className="text-sm text-richblack-300">
                        {`Home/Catalog/`}
                        <span className="text-yellow-25">{catalogData?.selectedCategory?.name}</span>
                    </p>

                    <p className="text-3xl text-richblack-5">
                        {catalogData?.selectedCategory?.name}
                    </p>

                    <p className="max-w-[870px] text-richblack-200">
                        {catalogData?.selectedCategory?.description}
                    </p>
                </div>

            </div> 

            {/* Section 1 */}
            <div  className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                <h2 className="text-2xl font-bold mb-6 text-richblack-5 lg:text-4xl">
                    Courses to get you started
                </h2>

                <div className="my-4 mb-10 flex border-b border-b-richblack-600 text-sm">

                    <p className={`px-4 py-2 cursor-pointer ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`} onClick={() => setActive(1)}>
                        Most Popular
                    </p>

                    <p className={`px-4 py-2 cursor-pointer ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`} onClick={() => setActive(2)}>
                        New
                    </p>
                </div>
            
                {
                    active === 1 && ( <CourseSlider courses={popular}/>)
                }
                {
                    active === 2 && (<CourseSlider courses={newCourses}/>)
                }

            </div>

            {/* Section-2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                <p className="text-2xl font-bold text-richblack-5 mb-7 lg:text-4xl">{`Similar to ${catalogData?.selectedCategory?.name}`} </p>

                <CourseSlider courses={catalogData?.differentCategory?.Courses}/>
            </div>

            {/* Section-3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                <p className="text-2xl md:text-4xl font-bold text-richblack-5 mb-7">Freguently Bought</p>
                
                <div className="grid grid-cols-2 gap-3 lg:gap-8 lg:py-8 pr-4 lg:grid-cols-2">
                    {
                        catalogData?.mostSelling?.slice(0,8).map((course , index) => (
                            <CourseCard course={course} Height={"lg:h-[400px]"} key={index} customClasses={"holographic-card transition-all duration-300"} />
                        ))
                    }
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Catalog