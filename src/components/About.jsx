import React from 'react'
import { faSchoolCircleExclamation,faGlobe,faUserTie,faListCheck,faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from 'react-bootstrap/Carousel';


function About() {
  return (
    <>
    <div className="container">
        <div className="row">
          
            <div>
                <h2 className='text-black fw-bold text-center mb-3'>What is MentorHub ? </h2>
                <p className='fw-bold fs-5' style={{textAlign:"justify",fontFamily:"cursive"}}>MentorHub is an innovative e-learning platform connecting users with verified mentors who are experts in their fields. Learn directly from successful businessmen on starting a business, professional traders on mastering trading, and accomplished photographers on perfecting photography, among many other specialists. These mentors offer invaluable insights and practical knowledge from their real-life experiences, providing guidance that goes beyond traditional education.</p>
            </div>
            

            <div className="row mt-3">
                
                <div className="col-md-6">
                <img src="/About1.png" alt="no image" width={"100%"} height={"100%"}/>
                </div>
                <div className="col-md-6">
                    <h3 className='text-black fw-bold mb-2'><span style={{color:'#B671FF'}}>Benefits</span> From Our Online<br/> Learning</h3>
                    <div className="ps-4">
                            <div className='d-flex mt-2'>
                                <div style={{height:'50px',width:'50px', backgroundColor:'#B671FF',color:'white',borderRadius:'50%'}} className='d-flex align-items-center justify-content-center me-2' >
                                <FontAwesomeIcon icon={faSchoolCircleExclamation} className='fs-3 p-2'/>
                                </div>
                                <div >
                                    <h5 className='text-black fw-bold'>No Traditional Boundaries</h5>
                                    <p>Break away from conventional education limitations</p>
                                </div>
                                
                            </div>

                            <div className='d-flex mt-2'>
                                <div style={{height:'50px',width:'50px', backgroundColor:'#FF8DA6',color:'white',borderRadius:'50%'}} className='d-flex align-items-center justify-content-center me-2' >
                                
                                <FontAwesomeIcon icon={faGlobe} className='fs-3 p-2'/>
                                </div>
                                <div>
                                    <h5 className='text-black fw-bold'>Real-Life Applications</h5>
                                    <p>Apply lessons from mentors' actual experiences</p>
                                </div>
                                
                            </div>

                            <div className='d-flex mt-2'>
                                <div style={{height:'50px',width:'50px', backgroundColor:'#B671FF',color:'white',borderRadius:'50%'}} className='d-flex align-items-center justify-content-center me-2' >
                                <FontAwesomeIcon icon={faUserTie} className='fs-3 p-2'/>
                                </div>
                                <div >
                                    <h5 className='text-black fw-bold'>Personalized Guidance</h5>
                                    <p>Receive expert advice and feedback on your progress</p>
                                </div>
                                
                            </div>

                            <div className='d-flex mt-2'>
                                <div style={{height:'50px',width:'50px', backgroundColor:'#FF8DA6',color:'white',borderRadius:'50%'}} className='d-flex align-items-center justify-content-center me-2' >
                                <FontAwesomeIcon icon={faListCheck} className='fs-3 p-2'/>
                                </div>
                                <div >
                                    <h5 className='text-black fw-bold'>Practical Knowledge</h5>
                                    <p>Gain real-world insights and actionable skills</p>
                                </div>
                                
                            </div>

                            <div className='d-flex mt-2'>
                                <div style={{height:'50px',width:'50px', backgroundColor:'#B671FF',color:'white',borderRadius:'50%'}} className='d-flex align-items-center justify-content-center me-2' >
                                <FontAwesomeIcon icon={faCircleCheck} className='fs-3 p-2'/>
                                </div>
                                <div >
                                    <h5 className='text-black fw-bold'>Access to Verified Experts</h5>
                                    <p>Learn from industry leaders and professionals</p>
                                </div>
                                
                            </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div className='my-4 py-4' style={{height:'auto', width:'100%',backgroundImage:"linear-gradient(#B671FF, #FF8DA6)"}}>
        <h3 className='text-white fw-bold text-center pt-4 fs-2'>Our Popular Mentors</h3>
        
        <div >
    
            <Carousel interval={3000}>
          <Carousel.Item >
          <div className='row'>
            <div className="col-md-2"></div>
            <div className="col-md-8">

            <div className="row p-5">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                       <div style={{border:'4px dashed yellow',borderRadius:'50%/30%'}}>
                            <div className="image-container pt-5 m-2" style={{width:'200px',height:'300px', backgroundColor:'yellow',borderRadius:'50%/30%',overflow:'hidden', display:'flex'}}>
                                <img src="sharique.png" alt="no image" width={'100%'} height={'auto'} style={{objectFit:'cover'}}/>
                            </div>
                       </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div>
                            <h2 className='text-black fw-bold'>Sharique Samsudheen</h2>
                            <p className='text-white fw-bold' style={{textAlign:'justify'}}>Sharique Samsudheen is the Founder & CEO of Marketfeed, he would likely bring valuable insights into financial education, stock trading, and the importance of democratizing access to financial tools. His experience in building one of India’s most prominent stock market communities and his deep commitment to financial literacy would make him an influential mentor</p>
                        </div>
                </div>
    
              </div>

            </div>
            <div className="col-md-2"></div>
          </div>
           
          </Carousel.Item>
          <Carousel.Item >

          <div className='row'>
            <div className="col-md-2"></div>
            <div className="col-md-8">

            <div className="row p-5">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                       <div style={{border:'4px dashed #02f5c5',borderRadius:'50%/30%'}}>
                            <div className="image-container pt-5 m-2" style={{width:'200px',height:'300px', backgroundColor:'#02f5c5',borderRadius:'50%/30%',overflow:'hidden', display:'flex'}}>
                                <img src="ritesh.png" alt="no image" width={'100%'} height={'auto'} style={{objectFit:'cover'}}/>
                            </div>
                       </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div>
                            <h2 className='text-black fw-bold'>Ritesh Agarwal </h2>
                            <p className='text-white fw-bold' style={{textAlign:'justify'}}>Ritesh Agarwal, the visionary Founder & CEO of OYO Rooms, started his entrepreneurial journey at just 17 and became a global success by 23. His remarkable story of perseverance and innovation is now available on Mentor Hub, where he is ready to inspire and guide the next generation of entrepreneurs. Gain insights from his real-world experience, and learn how to turn your business dreams into reality under his mentorship</p>
                        </div>
                </div>
    
              </div>

            </div>
            <div className="col-md-2"></div>
          </div>
          
          </Carousel.Item>
          <Carousel.Item >

          <div className='row'>
            <div className="col-md-2"></div>
            <div className="col-md-8">

            <div className="row p-5">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                       <div style={{border:'4px dashed #0243f5',borderRadius:'50%/30%'}}>
                            <div className="image-container pt-5 m-2" style={{width:'200px',height:'300px', backgroundColor:'#0243f5',borderRadius:'50%/30%',overflow:'hidden', display:'flex'}}>
                                <img src="joseph.png" alt="no image" width={'100%'} height={'auto'} style={{objectFit:'cover'}}/>
                            </div>
                       </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div>
                            <h2 className='text-black fw-bold'>Geo Joseph</h2>
                            <p className='text-white fw-bold' style={{textAlign:'justify'}}>Geo Joseph, along with Praveen Joseph, started a YouTube channel in 2017 that quickly gained popularity with its gadget reviews, tech experiments, and DIY crafts. With over 8.96 million subscribers, their content has inspired millions. Now available on Mentor Hub, Geo is ready to guide aspiring YouTubers on how to turn their passion into a successful career in the digital world.</p>
                        </div>
                </div>
    
              </div>

            </div>
            <div className="col-md-2"></div>
          </div>
          
          </Carousel.Item>

          <Carousel.Item >

          <div className='row'>
            <div className="col-md-2"></div>
            <div className="col-md-8">

            <div className="row p-5">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                       <div style={{border:'4px dashed #017524',borderRadius:'50%/30%'}}>
                            <div className="image-container pt-5 m-2" style={{width:'200px',height:'300px', backgroundColor:'#017524',borderRadius:'50%/30%',overflow:'hidden', display:'flex'}}>
                                <img src="Sreejith.png" alt="no image" width={'100%'} height={'auto'} style={{objectFit:'cover'}}/>
                            </div>
                       </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div>
                            <h2 className='text-black fw-bold'>Sreejith Radhakrishnan</h2>
                            <p className='text-white fw-bold' style={{textAlign:'justify'}}>Sreejith Radhakrishnan is a well-known wedding and fashion photographer from Kerala, recognized for his creative and captivating photography. With years of expertise, he has established himself as a top photographer in the region. Now available on Mentor Hub, Sreejith is ready to guide aspiring photographers, sharing his insights on building a successful career in wedding and fashion photography</p>
                        </div>
                </div>
    
              </div>

            </div>
            <div className="col-md-2"></div>
          </div>
          
          </Carousel.Item>
        </Carousel>
     </div>
                
            

    </div>
    </>
  )
}

export default About