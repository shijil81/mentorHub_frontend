import React, { useRef, useState } from 'react'
import { faUser,faEyeSlash,faEye,faSquareEnvelope,faCameraRetro,faTrashAlt,faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Modal } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { mregisterApi } from '../services/allApi';
import Swal from 'sweetalert2'

function MentorRegistration() {
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [mentorDetails,setMentorDetails]=useState({
    username:"",
    email:"",
    password:"",
    website:"",
    profession:"",
    description:"",
    verifyimg:null
  })
  console.log(mentorDetails);
  
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const [show,setShow]=useState(false)
  const handleClick=()=>{
    setShow(!show)
  }


  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // setMentorDetails({...mentorDetails, verifyimg: imageSrc});
      // alert('Image captured successfully');

          // Convert base64 to Blob
          const byteString = atob(imageSrc.split(',')[1]); // Decode base64
          const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: mimeString });
    
          // Convert Blob to File
          const file = new File([blob], 'captured_image.png', { type: 'image/png' });
          setMentorDetails({ ...mentorDetails, verifyimg: file });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
             timer: 2000
          });
          // alert('Image captured successfully');
    }
  };
  
  

  const retakePicture = () => {
    setCapturedImage(null);
    setMentorDetails({...mentorDetails, verifyimg: null});
    setShowModal(true); // Reopen the modal to retake picture
  };

  const handleRegister=async()=>{
    const{username,email,password,website,profession,description,verifyimg}= mentorDetails
    if(!username || !email || !password || !website || !profession || !description || !verifyimg){
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Something went wrong!"
      });
      // alert('please fill the form completely')
    }else{
      const reqBody=new FormData()

      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("website",website)
      reqBody.append("profession",profession)
      reqBody.append("description",description)
      reqBody.append("verifyimg",verifyimg)
  
       const reqHeader={
          "Content-Type":"multipart/form-data"
        }
        
      const result=await mregisterApi(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
        });
        // alert('Registration successful')
        setMentorDetails({
          username:"",
          email:"",
          password:"",
          website:"",
          profession:"",
          description:"",
          verifyimg:null
        })
        navigate('/login')
      }
      else{
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Something went wrong!"
        });
        // alert('somthing wrong')
        setMentorDetails({
          username:"",
          email:"",
          password:"",
          website:"",
          profession:"",
          description:"",
          verifyimg:null
        })
      }
      
    }
  }

  return (
    <>

<div style={{height:'auto', width:'100%',backgroundImage:"linear-gradient(#FF8DA6,#B671FF)"}}>
      
     

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
             <div className='border pt-3  rounded-4 shadow-lg  my-5 m-4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width:'100%'}}>
           <div className='d-flex align-items-center justify-content-center flex-column'>
              <img src="/logo.png" alt="no image" width={"75px"} height={"75px"} className='shadow-lg rounded-circle'/>
              <h3 className='text-center mt-2 text-black fw-bold'>Mentor Register</h3>
           </div>
            <div className='px-5 pt-4 pb-5'>
             <div className='input-box position-relative'> 
              <input type="text" className='form-control p-2 text-center shadow rounded-5' value={mentorDetails.username} placeholder='Name' onChange={(e)=>setMentorDetails({...mentorDetails,username:e.target.value})}/>
             <FontAwesomeIcon icon={faUser} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
             </div>
             <div className='input-box position-relative'> 
              <input type="text" className='form-control p-2 text-center shadow rounded-5 mt-4' value={mentorDetails.email} placeholder='Email Id' onChange={(e)=>setMentorDetails({...mentorDetails,email:e.target.value})}/>
             <FontAwesomeIcon icon={faSquareEnvelope} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }} />
             </div>
              <div className='input-box position-relative'>
                <input type={show?"text":"password"} className='form-control p-2 text-center shadow rounded-5 mt-4' placeholder='Password' value={mentorDetails.password} onChange={(e)=>setMentorDetails({...mentorDetails,password:e.target.value})}/>
                <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                  {show? 
                  <FontAwesomeIcon icon={faEyeSlash}  />
                  :
                  <FontAwesomeIcon icon={faEye} />
                } 
                </p>
               </div>

               <div className='input-box position-relative'> 
              <input type="text" className='form-control p-2 text-center shadow rounded-5 mt-4' value={mentorDetails.profession} placeholder='Profession' onChange={(e)=>setMentorDetails({...mentorDetails,profession:e.target.value})}/>
             <FontAwesomeIcon icon={faUserTie} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }} />
            
             </div>
               <div className='input-box position-relative pt-4 d-flex align-items-center justify-content-center'> 


                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-md-7">
                  <OverlayTrigger
                   placement="top"
                   delay={{ show: 150, hide: 400 }}
                   overlay={
                     <Tooltip id="profile-link">
                       Link to your public profile, such as your website, YouTube channel, or social media profiles.
                     </Tooltip>}
                     >
                    <input type="text" className='form-control p-2  text-center shadow rounded-5' value={mentorDetails.website} placeholder='Link of your profile' onChange={(e)=>setMentorDetails({...mentorDetails,website:e.target.value})} />
                    </OverlayTrigger>
                  </div>
                  <div className="col-md-5 d-flex justify-content-center align-items-center mt-4 mt-md-0">
                  <OverlayTrigger
                   placement="top"
                   delay={{ show: 150, hide: 400 }}
                   overlay={
                     <Tooltip id="profile-picture">
                       Capture and upload a live picture. It will only be used for verification to prevent fake profiles.
                     </Tooltip>}>
                    <button className=" btn btn-success shadow-lg py-1 rounded-5 px-3 ms-md-2 border-2"  onClick={handleShow} >Upload <FontAwesomeIcon icon={faCameraRetro} className='fw-bold fs-4 ' /></button>
                    </OverlayTrigger>
                  </div>
                </div>
             </div>
                    
             {capturedImage && (
        <div className='d-flex align-items-center justify-content-center flex-column mt-4'>
          <h6 className='text-black fw-bold'>Captured Image</h6>
          <img src={capturedImage} alt="Captured" className='rounded-4'  width={'200px'}/>
        </div>
      )}


              <textarea className='form-control p-2  text-center shadow rounded-5 mt-4' value={mentorDetails.description} placeholder='Tell about yourself' onChange={(e)=>setMentorDetails({...mentorDetails,description:e.target.value})}></textarea>
               <div className='d-flex justify-content-center align-items-center pt-4'>
                <button type='button' className="custom-rg p-2  rounded-5 mx-3 fw-bold shadow-lg " style={{width:'50%'}} onClick={handleRegister}>Register</button>
                </div>
                <p className='text-black pt-3 text-center'>Already a Mentor? <Link to={'/login'} className='text-black' style={{textDecoration:'none'}}><span className='fw-bold'>Login</span></Link></p>
              </div>
          
      </div> 
        </div>
        <div className="col-md-4"></div>
      </div>





    </div>
     
  <div style={{width:'100%', height:'3px', backgroundColor:'white'}}></div>


  {/* modal to capture image */}

  <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title>{capturedImage ? 'Review and Retake' : 'Capture Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
        {capturedImage ? (
            <div className="text-center">
              <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
              <div className="mt-3">
                <Button
                  variant="danger"
                  onClick={retakePicture}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className='me-2' />
                  Delete and Retake
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        {capturedImage ? (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={capture}>
                Capture
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
     
    </>
  )
}

export default MentorRegistration
