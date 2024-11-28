import React from 'react'

function UserProfileHome() {
  return (
    <>
      <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5' style={{backgroundColor:'#ea54f566'}}>
            <div className="d-flex justify-content-center align-items-center flex-column m-3">
                    <h2>Welcome Back</h2>
                    <img src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png" alt="no image" height={'150px'} width={'150px'} className='rounded-circle' />
                    <h4 className='text-black'>Name</h4>
                    <p>Full Stack Developer</p>
                    <div className='my-2 d-flex justify-content-between align-items-center'>
                        <div className='shadow-lg rounded-4 text-center px-2 py-1' style={{backgroundColor:'#9a68f7', width:'100px'}}>
                            <h2 className='text-black mt-2'>0</h2>
                            <p>Course<br/>Enrolled</p>
                        </div>
                        <div className='shadow-lg rounded-4 text-center px-2 py-1 ms-2' style={{backgroundColor:'#9a68f7', width:'100px'}}>
                            <h2 className='text-black mt-2'>7/10</h2>
                            <p>Average<br/>Score</p>
                        </div>
                        <div className='shadow-lg rounded-4 text-center px-2 py-1 ms-2' style={{backgroundColor:'#9a68f7', width:'100px'}}>
                            <h2 className='text-black mt-2'>0</h2>
                            <p>Course<br/>Completed</p>
                        </div>
                    </div>
                    <div style={{width:'75%', height:'3px', backgroundColor:'red'}} className='my-3'></div>

                    <div className='d-flex'>
                      <button className="custom-cr p-2 rounded-4 mt-3 me-2 shadow fw-bold">View Profile</button>
                      <button className="custom-rg p-2  border rounded-4 mt-3 shadow fw-bold">Messages</button>
                    </div>

            </div>
        </div>
    </>
  )
}

export default UserProfileHome
