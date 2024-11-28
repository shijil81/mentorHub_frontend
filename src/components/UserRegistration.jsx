import React, { useState } from 'react'
import { faUser,faEyeSlash,faEye,faSquareEnvelope,faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { uregisterApi } from '../services/allApi'
import Swal from 'sweetalert2'

function UserRegistration() {
  const navigate= useNavigate()
  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    profession:"",
    description:""

  })

  const [show,setShow]=useState(false)
  const handleClick=()=>{
    setShow(!show)
  }

  const handleRegister=async(e)=>{
    e.preventDefault()
    const{username,email,password,profession,description}=userDetails
    if(!username || !email || !password || !profession || !description){
      Swal.fire({
        position: "center",
        icon:"info",
        title: "please fill the field completly",
      });
      // alert('please fill the field completly')
    }else{
      const result=await uregisterApi(userDetails)
      console.log(result);
      if(result.status==200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
           timer: 2000
        });
        // alert('Registration successful')
        setUserDetails({
          username:"",
          email:"",
          password:"",
          profession:"",
          description:""
        })
        navigate('/login')
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        // alert('somthing wrong')
        setUserDetails({
          username:"",
          email:"",
          password:"",
          profession:"",
          description:""
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
              <h3 className='text-center mt-2 text-black fw-bold'>User Register</h3>
           </div>
            <div className='px-5 pt-4 pb-5'>
             <div className='input-box position-relative'> 
              <input type="text" className='form-control p-2 text-center shadow rounded-5' value={userDetails.username} placeholder='Name' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>
             <FontAwesomeIcon icon={faUser} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
             </div>
             <div className='input-box position-relative'> 
              <input type="text" className='form-control p-2 text-center shadow rounded-5 mt-4' value={userDetails.email} placeholder='Email Id' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
             <FontAwesomeIcon icon={faSquareEnvelope} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
             </div>
              <div className='input-box position-relative'>
                <input type={show?"text":"password"} value={userDetails.password} className='form-control p-2 text-center shadow rounded-5 mt-4' placeholder='Password' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                  {show? 
                  <FontAwesomeIcon icon={faEyeSlash}  />
                  :
                  <FontAwesomeIcon icon={faEye} />
                }
                  
                    
                </p>
               </div>

               <div className='input-box position-relative'> 
              <input type="text"  className='form-control p-2 text-center shadow rounded-5 mt-4' value={userDetails.profession} placeholder='profession' onChange={(e)=>setUserDetails({...userDetails,profession:e.target.value})}/>
             <FontAwesomeIcon icon={faUserTie} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
             </div>


               <div>
                <textarea className='form-control p-2  text-center shadow rounded-5 mt-4' value={userDetails.description} placeholder='Tell about yourself' onChange={(e)=>setUserDetails({...userDetails,description:e.target.value})}></textarea>
                </div>
               <div className='d-flex justify-content-center align-items-center pt-4'>
                <button className="custom-rg p-2  rounded-5 mx-3 fw-bold shadow-lg " style={{width:'50%'}} type='button' onClick={handleRegister}>Register</button>
                </div>
                <p className='text-black pt-3 text-center'>Already a user? <Link to={'/login'} className='text-black' style={{textDecoration:'none'}}><span className='fw-bold'>Login</span></Link></p>
              </div>
      </div> 
        </div>
        <div className="col-md-4"></div>
      </div>





    </div>
     
  <div style={{width:'100%', height:'3px', backgroundColor:'white'}}></div>
 
   </>
  )
}

export default UserRegistration