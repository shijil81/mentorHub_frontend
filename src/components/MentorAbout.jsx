import React from 'react'
import { Link } from 'react-router-dom'

function MentorAbout() {
  return (
    <>
      <div className="container my-4">
      <div className="row mt-5 d-flex justify-content-center align-items-center">
        
        <div className="col-md-7 d-flex justify-conent-center align-items-center">
         <div>
            <h3 style={{color:'black'}} className='fw-bold'>
            If You Have Real-World Experience,<br/><span style={{color:'#B671FF'}}>Then Become a Mentor</span>
            </h3>
            <div className="row mt-3">
                <h3 style={{color:'black'}} className='fw-bold'>Enjoy Many Perks</h3>
                <div className="col-md-6">
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#B671FF',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Help Empower the Next Generation</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#FF8DA6',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Shape the Future of Learning</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#B671FF',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Connect with Like-Minded Professionals</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#FF8DA6',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Teach Your Way, Your Style</p>
                    </div>

                </div>
                <div className="col-md-6">
                <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#B671FF',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Empower Others Through Your Expertise</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#FF8DA6',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Build Your Personal Brand</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#B671FF',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Share Your Passion with the World</p>
                    </div>
                    <div className='d-flex mt-2'>
                    <div style={{height:'30px',width:'30px', backgroundColor:'#FF8DA6',borderRadius:'50%'}} className='me-2 p-3' ></div>
                    <p className='text-black fw-bold'>Transform Lives with Your Experience</p>
                    </div>

                </div>

            </div>
            <Link to={'/mregister'}><button className="custom-bt p-2 px-3 rounded mt-4">Become a Mentor</button></Link>
         </div>
        </div>
        <div className="col-md-5">
          <img src="/Mentor.png" alt="no image" width={"100%"} height={"100%"}/>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MentorAbout
