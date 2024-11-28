import { faFacebook,faSquareXTwitter,faSquareInstagram,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



function Footer() {
  return (
    <>
    <div className='pt-4' style={{width:'100%',backgroundImage:"linear-gradient(#B671FF, #FF8DA6)"}}>
        <div className="container  text-white mb-3">
            <div className='row '>
                <div className="col-md-1"></div>
                <div className="col-md-10">
                <div className="row d-flex justify-content-around align-items-center">
                    <div className="col-md-3 p-4">
                        <h4 className='fw-bold text-white'>MentorHub</h4>
                        <p className='pt-3' style={{textAlign:'justify'}}>A platform featuring real-world experts teaching essential life skills not taught in schools.</p>
                        <div className='d-flex justify-content-around align-items-center'>
                        <FontAwesomeIcon icon={faFacebook} className='fs-2'/>
                        <FontAwesomeIcon icon={faSquareXTwitter} className='fs-2'/>
                        <FontAwesomeIcon icon={faSquareInstagram} className='fs-2'/>

                        </div>
                        
                    </div>
                    <div className="col-md-2 p-4 d-flex justify-content-center align-items-center flex-column">
                         <h4 className='fw-bold text-white'>Company</h4>
                         <div className='ps-2'>
                             <h6 className='text-white pt-3'>About Us</h6>
                             <h6 className='text-white pt-2'>Services</h6>
                             <h6 className='text-white pt-2'>Community</h6>
                             <h6 className='text-white pt-2'>Testimonials</h6>
                         </div>
                    </div>
                    <div className="col-md-2 p-4 d-flex justify-content-center align-items-center flex-column">
                    <h4 className='fw-bold text-white'>Support</h4>
                         <div className='ps-2'>
                             <h6 className='text-white pt-3'>Help Center</h6>
                             <h6 className='text-white pt-2'>Tweet Us</h6>
                             <h6 className='text-white pt-2'>Webinars</h6>
                             <h6 className='text-white pt-2'>Feedback</h6>
                         </div>
                    </div>
                    <div className="col-md-3 p-3 d-flex justify-content-center align-items-center flex-column">
                    <h4 className='fw-bold text-white'>Links</h4>
                         <div className='ps-5'>
                             <h6 className='text-white pt-3'>Courses</h6>
                             <h6 className='text-white pt-2'>Become Mentor</h6>
                             <h6 className='text-white pt-2'>Service</h6>
                             <h6 className='text-white pt-2'>All in One</h6>
                         </div>
                    </div>
                </div>
                </div>
                <div className="col-md-1"></div>
                
            </div>
        </div>

        <div style={{width:'100%', height:'3px', backgroundColor:'white'}}></div>
        <a href="https://www.linkedin.com/in/shijil-k" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='py-1 text-white text-center'>
                <p className='mt-2'><FontAwesomeIcon icon={faCopyright} className='me-2'/> <small>SHIJIL K </small><FontAwesomeIcon icon={faLinkedin} className='ms-2'/></p>
            </div>
        </a>

    </div>
    </>
  )
}

export default Footer