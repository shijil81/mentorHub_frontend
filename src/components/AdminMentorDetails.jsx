import {React,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../services/serverUrl';
import { Link } from 'react-router-dom';


function AdminMentorDetails() {
  const {mentors,status,error}=useSelector((state)=>state.mentors)

  // fetching and displaying mentors verified mentors from redux
  if(status=='loading') return <div>Loading verified mentors..</div>
  if (status === 'failed') return <div>Error: {error}</div>;
  const verifiedMentors = mentors.filter(mentor => mentor.status === 'verified');

  console.log(verifiedMentors);
  


  return (
    <>
        <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100' style={{backgroundColor:'#8e39f766'}}>
           <div className='my-3'>
                <h3 className='text-black fw-bold'>Mentors</h3>
           </div>

           <div className='scrollable-container'  style={{height:'800px', overflowY:'auto'}}>
             {verifiedMentors?.map((mentor)=>(<div className='d-flex align-items-center justify-content-center mt-4 mx-2' key={mentor?._id}>
              <div className='d-flex shadow rounded-4 p-4 flex-column w-100'  style={{backgroundColor:'#ea54f566'}}>
                    <div className='d-flex'>
                          <div className='d-flex justify-content-center align-items-center'>
                          <img  src={mentor.profile? `${serverUrl}/uploads/${mentor.profile}`
                          : "https://woxikon.co.nz/uploads/large-default.jpg"
                      }   alt="no image" height={'100px'} width={'100px'} className='rounded-circle' />
                          </div>
                          <div className='ms-2'>
                              <h4 className='text-black'>{mentor?.username}</h4>
                              <p>{mentor?.description?.slice(0,15)}...</p>
                          </div>
                    </div>
                      <div className='d-flex align-items-center justify-content-center'>
                      <Link to={`/adminmentorview/${mentor?._id}`}><button className="btn btn-outline-danger p-2 px-5 rounded-4 m shadow">View</button></Link>
                      </div>
              </div>
  
             </div>))}
           </div>

           
        </div>

        


    </>
  )
}

export default AdminMentorDetails