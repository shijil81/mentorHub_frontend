import React from 'react'
import { faComments, faClock,faClipboardList,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AllMentors from '../components/AllMentors'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';




export default function Home() {
  const user=useSelector((state)=>state.user.userInfo)

  return (
    <>
    <div className="container">
    <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-5 d-flex justify-conent-center align-items-center">
         <div>
            <h2 className='fw-bold pb-4'>Welcome back {user?.username}</h2>
            
            <h1 style={{color:'black'}} className='fw-bold'>
            Develop your <br/> skills in a new <br/>and unique way
            </h1>
            <p className='fw-bold'>A platform where real-world experts teach essential life skills often missing from schools, offering practical knowledge and hands-on guidance to enhance personal and professional growth.</p>
            <Link to={'/user'}><button className="custom-bt p-2 px-3 rounded ">View Profile</button></Link>
         </div>
        </div>
        <div className="col-md-5">
          <div className="container my-5">
            <div className="row mentor-section p-3">
              <div className="col-6 p-0">
                <div className='mentor-card purple-bg rounded-top-left'>
                <img src="/nikhil.png" alt="mentor-1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-6 p-0">
              <div className='mentor-card pink-bg rounded-top-right'>
              <img src="/ritesh.png" alt="mentor-1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-6 p-0">
              <div className='mentor-card pink-bg rounded-bottom-left'>
              <img src="/deepinder.png" alt="mentor-1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-6 p-0">
              <div className='mentor-card purple-bg rounded-bottom-right'>
              <img src="/sharique.png" alt="mentor-1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </div>
          
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>

    <div className='mb-4 d-flex align-items-center justify-content-center' style={{width:'100%', height:'90px', backgroundImage:"linear-gradient(#B671FF, #FF8D9D)"}}>
      <div className='d-flex align-items-center  w-md-50'>
        
        <Link to={'/ubooking'} style={{ textDecoration: 'none' }}>
        <div className="text-white d-flex justify-content-center me-5">
          <FontAwesomeIcon icon={faClock} className='fs-2 me-2' />
          <p className='pt-1 fw-bold d-none d-sm-block fs-5'>My Bookings</p>
          </div>
        </Link>
        <Link to={'/ucourse'} style={{ textDecoration: 'none' }}>
        <div className="text-white d-flex justify-content-center me-5">
          <FontAwesomeIcon icon={faClipboardList} className='fs-2 me-2'/>
          <p className='pt-1 fw-bold d-none d-sm-block fs-5'>Courses</p>
        </div>
        </Link>
        <div className="text-white d-flex justify-content-center"  style={{ cursor: "pointer" }}   onClick={() =>
                Swal.fire({
                  icon: "info",
                  title: "Sorry",
                  text: "This feature is currently not available...",
                })
              }>
        <FontAwesomeIcon icon={faComments} className='fs-2 me-2'/>
        <p className='pt-1 fw-bold d-none d-sm-block fs-5'>Messages</p>
        </div>

      </div>

    </div>

  
    <div>
      <AllMentors/>
    </div>

   
    </>
  )
}
