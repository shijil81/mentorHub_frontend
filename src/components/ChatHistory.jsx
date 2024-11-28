import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Chat from './Chat';
import { getIntractedUsersApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';

function ChatHistory() {
  const [show, setShow] = useState(false);

  const [recentChats,setRecentChats]=useState([])
  const[error,setError]=useState('')
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user); // Set the selected user
    setShow(true);
  };

  const fetchRecentUsers=async()=>{
    const token=sessionStorage.getItem('token')
    if(!token){
      setError('No token found,please login')
      return;
    }

    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response= await getIntractedUsersApi(reqHeader)
      if(response.status==200){
        setRecentChats(response.data)
      }else{
        setError('Faild to fetch user intractions')
      }
    } catch (error) {
      setError('An error occurred while fetching user interactions');
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchRecentUsers()
  },[])


 
  return (
    <>
    <div className='scrollable-container-recent' >
    {error && <div className='text-danger'>{error}</div>}
        {recentChats.length > 0 ? (
          recentChats.map((user) => (
            <div
              className='rounded-4 p-2 mt-2 mx-auto'
              key={user._id} // Use user._id or another unique identifier
              style={{ width: '100%', backgroundImage: 'linear-gradient(#fbc1cd,#d8b8fb)' }}
              onClick={() => handleShow(user)}
            >
              <div className='d-flex align-items-center'>
                <img
                  src={
                    user.profile
                      ? `${serverUrl}/uploads/${user.profile}`
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFgQrbwN1RthTLcuPTI9yRyRAJDwHyP1KSQ&s'
                  }
                  alt='profile'
                  className='rounded-circle'
                  style={{ height: '80px', width: '80px' }}
                />
                <div className='ms-2'>
                  <h3>{user.username}</h3>
                  <h5 className='mt-2'>{user.lastMessage || 'No recent message'}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-danger fw-bold text-center mt-5'><h1>No previously interacted users</h1></div> // Message when no previous interactions are available
        )}

    </div>

{/* chat modal */}
    <Modal show={show} onHide={handleClose} style={{zIndex:'2500'}} size="md" centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <Chat user={selectedUser} />
        </Modal.Body>  
      </Modal>

    </>
  )
}

export default ChatHistory