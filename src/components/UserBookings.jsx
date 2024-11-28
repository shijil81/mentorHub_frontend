import React, { useState } from 'react'
import { faSpinner,faComments,faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChatHistory from './ChatHistory';



function UserBookings() {
  const [bookings,setBookings]=useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100' style={{backgroundColor:'#ea54f566', height:'975px'}}>
     <div className='my-3 d-flex'>
                <h3 className='text-black fw-bold'>My Bookings</h3>
                <div className="ms-auto d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-info rounded-5  me-2"
              onClick={handleShow}>
              <FontAwesomeIcon icon={faComments} className=" fw-bold fs-3" />
            </button>
    
          </div>
           </div>

          {bookings.length>0? <div className='mt-4'>
            <div className='d-flex shadow rounded-4 p-4 flex-column' style={{backgroundColor:'#8e39f766'}}>
                  <div>
                            <h4 className='text-black'>Date</h4>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                    <div className='d-flex align-items-center justify-content-center'>
                    <button className="custom-cr p-2 px-5 rounded-4 m shadow">View</button>
                    </div>
            </div>

           </div>
            :
           <div className='d-flex justify-content-center align-items-center vh-100'>
            <h4 className='text-center text-black '>No Bookings yet <FontAwesomeIcon icon={faSpinner} spinPulse className="ms-3"/></h4>
           </div>}

        </div>

        {/* offcanvas */}
        <Offcanvas show={show} onHide={handleClose} style={{zIndex:'2500',backgroundColor:'#363535'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fw-bold'>Chat History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatHistory/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default UserBookings