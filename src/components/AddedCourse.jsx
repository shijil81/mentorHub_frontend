import {faIdCard,faComments,faHeadset} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import AllVideo from "../components/AllVideo";
import { useNavigate, useParams } from "react-router-dom";
import {  getMentorByIdApi } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import Chat from './Chat';

function AddedCourse() {
    const navigate=useNavigate()
  const { id } = useParams();
  const [mentor, setMentor] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const fetchMentorDetails = async () => {
    try {
      const response = await getMentorByIdApi(id);
      if (response.status == 200) {
        setMentor(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchMentorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading.....</div>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>

     {/* about section */}
     <div className="corner-design">
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-8 p-5" style={{ zIndex: "1500" }}>
              <h2 className="fw-bold ">{mentor?.username}</h2>
              <h4 className="fw-bold text-dark">{mentor?.profession}</h4>
              <p className="px-3">{mentor?.description}</p>

              <div className='d-flex  justify-content-center align-items-center'>
                     <button className='btn btn-primary me-3 fw-bold'  onClick={handleShow} ><FontAwesomeIcon icon={faComments} className='me-1'  />Messages</button>
                       <button className='btn btn-outline-success fw-bold' onClick={() => alert('This feature is currently not available.')}><FontAwesomeIcon icon={faHeadset} className='me-1'/>Book Video Call</button>
                     </div>
              {/* <div className="d-flex  justify-content-center align-items-center">
                <button className="btn btn-success me-3 fw-bold">
                  <FontAwesomeIcon icon={faBook} className="me-2 fs-4" />
                  Message
                </button>

                <button className="btn btn-success me-3 fw-bold">
                  <FontAwesomeIcon icon={faBook} className="me-2 fs-4" />
                  Book Live Session
                </button>
              </div> */}
            </div>
            <div
              className="col-md-4 d-flex justify-content-center align-items-center"
              style={{ zIndex: "1500" }}
            >
              <img
                src={
                  mentor?.profile
                    ? `${serverUrl}/uploads/${mentor?.profile}`
                    : "https://woxikon.co.nz/uploads/large-default.jpg"
                }
                alt="Profile Image"
                className="border border-5"
                style={{
                  borderRadius: "20px",
                  height: "350px",
                  width: "350px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="mb-4 d-flex align-items-center justify-content-center"
        style={{
          width: "100%",
          height: "90px",
          backgroundImage: "linear-gradient(#B671FF, #FF8D9D)",
        }}
      >
        <div className="d-flex align-items-center  w-md-50">
          <h5 className="text-dark fw-bold ">
            <FontAwesomeIcon icon={faIdCard} className="me-2" />
            My Public Profile Here :
            <a
              href={
                mentor?.website.startsWith("http")
                  ? mentor.website
                  : `http://${mentor.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-black ps-2"
            >
              {mentor?.website}
            </a>
          </h5>
        </div>
      </div>

       {/* Video Session */}

       <div className="mb-5">
        <h3 className="fw-bold text-center text-black pt-3">
          Check My Free Sessions Here..
        </h3>
        <AllVideo mentorId={mentor?._id} />
      </div>


              {/* chat modal */}
    <Modal show={show} onHide={handleClose} style={{zIndex:'2500'}} size="md" centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <Chat user={mentor}/>
        </Modal.Body>  
      </Modal>
          

    </>
    
  )
}

export default AddedCourse
