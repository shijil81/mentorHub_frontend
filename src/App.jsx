import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Mentor from './pages/Mentor'
import User from './pages/User'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import UserRegistration from './components/UserRegistration'
import MentorRegistration from './components/MentorRegistration'
import MentorView from './pages/MentorView'
import AddedCourse from './components/AddedCourse'
import AdminMentorView from './components/AdminMentorView'
import AllMentors from './components/AllMentors'
import UserBookings from './components/UserBookings'
import UserCourses from './components/UserCourses'


function App() {


  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/mentor' element={<Mentor/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/uregister' element={<UserRegistration/>}/>
      <Route path='/mregister' element={<MentorRegistration/>}/>
      <Route path='/mview/:id' element={<MentorView/>}/>
      <Route path='/addedcourse/:id' element={<AddedCourse/>}/>
      <Route path='/adminmentorview/:id' element={<AdminMentorView/>}/>
      <Route path='/allmentors' element={<AllMentors/>}/>
      <Route path='/ubooking' element={<UserBookings/>}/>
      <Route path='/ucourse' element={<UserCourses/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
