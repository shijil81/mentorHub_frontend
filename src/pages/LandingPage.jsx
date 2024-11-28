import { faComments, faVideo,faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import About from '../components/About'
import MentorAbout from '../components/MentorAbout'
import Subscribe from '../components/Subscribe'
import { Link } from 'react-router-dom'



function LandingPage() {

  useEffect(() => {
    // Check if the URL contains the hash #mentorabout scroll to the section while click about on header from pages other than landing
    if (window.location.hash === '#mentorabout') {
      const mentorAboutSection = document.getElementById('mentorabout');
      if (mentorAboutSection) {
        mentorAboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []); 
  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-5 d-flex justify-conent-center align-items-center">
         <div>
            <h1 style={{color:'black'}} className='fw-bold'>
            Develop your <br/> skills in a new <br/>and unique way
            </h1>
            <p className='fw-bold'>A platform where real-world experts teach essential life skills often missing from schools, offering practical knowledge and hands-on guidance to enhance personal and professional growth.</p>
            <Link to={'/uregister'}><button className="custom-bt p-2 px-3 rounded ">Register</button></Link>
         </div>
        </div>
        <div className="col-md-5">
          <img src="/About.png" alt="no image" width={"100%"} height={"100%"}/>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
    <div className='mb-4 d-flex align-items-center justify-content-center' style={{width:'100%', height:'90px', backgroundImage:"linear-gradient(#B671FF, #FF8D9D)"}}>
      <div className='d-flex align-items-center  w-md-50'>
        <div className="text-white d-flex justify-content-center me-5">
        <FontAwesomeIcon icon={faVideo} className='fs-2 me-1' />
        <p className='pt-1 fw-bold d-none d-sm-block'>Free Sessions</p>
        </div>
        <div className="text-white d-flex justify-content-center me-5">
        <FontAwesomeIcon icon={faComments} className='fs-2 me-1'/>
        <p className='pt-1 fw-bold d-none d-sm-block'>Easy Connect</p>
        </div>
        <div className="text-white d-flex justify-content-center">
        <FontAwesomeIcon icon={faCircleCheck} className='fs-2 me-1'/>
        <p className='pt-1 fw-bold d-none d-sm-block'>Verified Mentors</p>
        </div>

      </div>

    </div>
    <div>
      <About/>
    </div>
    <div id="mentorabout">
      <MentorAbout/>
    </div>
    <div>
      <Subscribe/>
    </div>
      
    </>
    
  )
}

export default LandingPage