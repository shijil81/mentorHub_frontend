import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { addSubscriptionApi } from '../services/allApi'


function Subscribe() {
  const [email,setEmail]=useState()

  const handleSubscribe = async()=>{
    try {
      if(!email){
        setEmail("")
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Please enter a valid email",
          
        })
      }
      else{
        const reqBody={email}

        const response=await addSubscriptionApi(reqBody)
        if (response.status === 200) {
          setEmail("")
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Subscribed successfully!", 
          })
          
        }
        else if (response.status === 406) {
          setEmail("");
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Already a subscriber!",
          });
        } 
         else {
          setEmail("")
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to subscribe. Try again.", 
          })
        }
      }

      
    } catch (error) {
      console.log(error)
      setEmail("")
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error: Unable to subscribe.", 
      })
      
    }
  }

  return (
    <>
    <div  style={{width:'100%',height:'25px', backgroundColor:'#B671FF'}}></div>
      <div  style={{width:'100%',backgroundColor:'#B671FF'}}>
        <div style={{width:'100%',backgroundColor:'white',borderRadius:'100px 0 100px 0',padding:'70px'}}>
            <div className='d-flex align-items-center justify-content-center'>
                <div style={{backgroundImage:'linear-gradient(#A971FF, #FF8DA6)',borderRadius:'20px',width:'500px'}} className='d-flex justify-content-center align-items-center'>
                    <div className='p-4 text-white text-center'>
                        <h4 className='text-white fw-bold'>Get In Touch!</h4>
                        <p style={{textAlign:'center'}}>Subscribe Us to get in touch and to enjoy discounts,<br/> promos and much more!</p>
                        <div className="d-flex justify-content-between align-items-center">
                         <input type="text" placeholder="Enter your email..." className="form-control px-3 py-2 rounded-3" value={email} style={{ width: '100%' }} onChange={(e)=>setEmail(e.target.value)}/>
                         <button className="btn bg-white ms-3" style={{ color: '#FF8DA6' }} onClick={handleSubscribe}>Subscribe</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>



    </>
  )
}

export default Subscribe
