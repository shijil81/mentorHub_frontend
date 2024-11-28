import { faUser,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../services/allApi'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/userSlice'
import { getMentors } from '../redux/slices/mentorSlice'
import Swal from 'sweetalert2'


function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [userDetails,setUserDetails]=useState({
    email:"",
    password:""
  })
  const [show,setShow]=useState(false)
  const handleClick=()=>{
    setShow(!show)
  }

  const handleLogin= async(e)=>{
    e.preventDefault()
    const{email,password}=userDetails

    if(!email || !password){
      Swal.fire({
        position:"center",
        icon:"warning",
        title:"Please fill form completely"
      })
      // alert('Please fill form completely')
    }else{
      const result=await loginApi(userDetails)
      console.log(result);
      
      if(result.status==200){
        setUserDetails({
          email:"",
          password:""
        })
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser._id))
        sessionStorage.setItem("token",result.data.token)

        dispatch(loginUser(result.data.existingUser))


        if(result.data.existingUser.role=="admin"){
          Swal.fire({
            position:"center",
            icon:"success",
            title:"Login Successfull"
          })

          // alert('Login successfull')
            navigate('/admin')
          
          
        }
        else if(result.data.existingUser.role=="mentor"){
          if(result.data.existingUser.status=="pending"){
      
            // alert('Your Profile is under verification usually it take 0-24hr please try after some time')
            Swal.fire({
              position:"center",
              icon:"info",
              title:"Your Profile is under verification usually it take 0-24hr please try after some time"
            })
          }else{
            Swal.fire({
              position:"center",
              icon:"success",
              title:"Login Successfull"
            })

            // alert('Login successfull')
            navigate('/mentor')
          }
          
        }else{
          Swal.fire({
            position:"center",
            icon:"success",
            title:"Login Successfull"
          })
          // alert('Login successfull')
    
          navigate('/home')
        }
        

      }
      else{
        Swal.fire({
          position:"center",
          icon:"error",
          title:"login faild please check your email and password"
        })
        // alert('login faild please check your email and password')
        setUserDetails({
          email:"",
          password:""
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
               <div className='border pt-3  rounded-4 shadow-lg  my-5 m-3' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width:'100%'}}>
             <div className='d-flex align-items-center justify-content-center flex-column'>
                <img src="/logo.png" alt="no image" width={"75px"} height={"75px"} className='shadow-lg rounded-circle'/>
                <h3 className='text-center mt-2 text-black fw-bold'>Login</h3>
             </div>
              <div className='px-5 pt-4 pb-5'>
               <div className='input-box position-relative'> 
                <input type="text" className='form-control p-2 text-center shadow rounded-5' value={userDetails.email} placeholder='Email Id' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
               <FontAwesomeIcon icon={faUser} className='fs-4 position-absolute' style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}/>
               </div>
                <div className='input-box position-relative'>
                  <input type={show?"text":"password"} className='form-control p-2 text-center shadow rounded-5 mt-4' placeholder='Password' value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                  <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                    {show? 
                    <FontAwesomeIcon icon={faEyeSlash}  />
                    :
                    <FontAwesomeIcon icon={faEye} />
                  }
                  </p>
                 </div>
                 <div className='d-flex justify-content-center align-items-center pt-4'>
                  <button type='button' onClick={handleLogin}   className="custom-lg p-2  rounded-5 mx-3 fw-bold shadow-lg " style={{width:'50%'}}>Login</button>
                  </div>
                  <p className='text-black pt-3 text-center'>Are you a new user? <Link to={'/uregister'} className='text-black' style={{textDecoration:'none'}}><span className='fw-bold'>Register</span></Link></p>
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

export default Login