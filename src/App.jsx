import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/common/Navbar'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import OpenRoute from './components/core/Auth/OpenRoute'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import ContactUspage from './pages/ContactUspage'
import MyProfile from './components/core/dashboard/MyProfile'
import Error from './pages/Error'
import SettingsPage from './components/core/dashboard/Settings/SettingsPage'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './util/constants'
import EnrolledCourses from './components/core/dashboard/EnrolledCourses'
import CartPage from './components/core/dashboard/Cart/CartPage'
import AddCoursePage from './components/core/dashboard/AddCourse/AddCoursePage'
import MyCourses from './components/core/dashboard/MyCourses'
import EditCoursePage from './components/core/dashboard/EditCourse/EditCoursePage'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import InstructorDashboard from './components/core/dashboard/InstructorDashboard'

function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>

      <Navbar/>
        
      <Routes> 
        <Route path='/' element = {<HomePage/>} />
        <Route path='/signup' element = {<OpenRoute><SignUp/></OpenRoute>}/>
        <Route path='/login' element = {<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path='/verify-email' element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUspage/>} />
        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='*' element={<Error/>} />
        <Route path='/courses/:courseId' element={<CourseDetails/>} />
        <Route element = {<PrivateRoute><Dashboard/></PrivateRoute>}>

          <Route path='/dashboard/my-profile' element={<MyProfile/>} />
          <Route path='/dashboard/settings' element={<SettingsPage/>} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='/dashboard/cart' element={<CartPage/>}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/add-course' element={<AddCoursePage/>}/>
                <Route path='/dashboard/my-courses' element={<MyCourses/>} />
                <Route path='/dashboard/edit-course/:courseId' element={<EditCoursePage/>} />
                <Route path='/dashboard/instructor-dashboard' element={<InstructorDashboard/>} /> 
              </>
            )
          }
        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails/>}/>
            )
          }
        </Route>

      </Routes> 
        
    </div>
        
  )
}

export default App
