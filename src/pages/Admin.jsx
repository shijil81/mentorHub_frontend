import React, { useEffect } from 'react'
import AdminProfile from '../components/AdminProfile'
import AdminMentorDetails from '../components/AdminMentorDetails'
import AdminSubscriptions from '../components/AdminSubscriptions'
import { useDispatch, useSelector } from 'react-redux'
import { getMentors } from '../redux/slices/mentorSlice'


function Admin() {
  const token=sessionStorage.getItem("token")//check if there is logged in
  // const user=useSelector((state)=>state.user.userInfo)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    if(token){
      dispatch(getMentors())// Fetch mentors after login
    }
  },[dispatch,token])
  return (
    <>
      <div className='container'>
      <div className="row d-flex justify-content-center align-items-start ">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <AdminProfile/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <AdminMentorDetails/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <AdminSubscriptions/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Admin
