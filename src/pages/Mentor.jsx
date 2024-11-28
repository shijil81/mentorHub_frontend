import React from 'react'
import MentorProfile from '../components/MentorProfile'
import MentorUploads from '../components/MentorUploads'
import MentorBookings from '../components/MentorBookings'

function Mentor() {
  return (
    <>
     <div className='container'>
      <div className="row d-flex justify-content-center align-items-start">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <MentorProfile/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <MentorUploads/>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
              <MentorBookings/>
        </div>
      </div>
    </div>

      
    </>
  )
}

export default Mentor
