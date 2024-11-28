import React from 'react'
import UserProfile from '../components/UserProfile'
import UserCourses from '../components/UserCourses'
import UserBookings from '../components/UserBookings'

function User() {
  return (
    <>
    <div className='container'>
      <div className="row d-flex justify-content-center align-items-start">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <UserProfile/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <UserCourses/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <UserBookings/>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default User