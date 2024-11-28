import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { React,useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getSubscriptionsApi, verifyMentorApi } from '../services/allApi';
import { getMentors} from '../redux/slices/mentorSlice';
import Swal from 'sweetalert2'
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';


function AdminSubscriptions() {
  const dispatch=useDispatch()
  const {mentors,status,error}=useSelector((state)=>state.mentors)
  console.log("mentors:",mentors);


  
  const [show, setShow] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState({
    userId:"",
    username:"",
    email:"",
    password:"",
    website:"",
    verifyimg:"",
    status:"",
    description:"",
    profile:"",
  }) 
  const [subscriptions,setSubscriptions]=useState([])

  const fetchSubscriptions = async ()=>{
    try {
      const response = await getSubscriptionsApi()
      if(response.status==200){
        setSubscriptions(response.data)
      } 
    } catch (error) {
      console.log(error);  
    }
  }
  useEffect(()=>{
    fetchSubscriptions()
  },[])

  // fetching and display mentors from redux
  if (status === 'loading') return <div>Loading unverified mentors...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  const unverifiedMentors = mentors.filter(mentor => mentor.status === 'pending');

  // verification modal
  const handleClose = () => setShow(false);
  const handleShow = (mentor) => {
    setSelectedMentor(
      {
        userId:mentor?._id,
        username:mentor?.username,
        email:mentor?.email,
        website:mentor?.website,
        verifyimg:mentor?.verifyimg,
        status:mentor?.status,
        description:mentor?.description,
        profile:mentor?.profile,
      }
    );  // Set selected mentor's details
    setShow(true);
  };

  const handleUpdate=async()=>{
    const token= sessionStorage.getItem("token")
    if(token){
      
      const result=await verifyMentorApi(selectedMentor)
      // console.log(result);
      if(result.status==200){
        dispatch(getMentors())
        Swal.fire({
          position:"center",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        // alert('Updated successfully')
        handleClose()
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        // alert('Somthing Went Wrong')
      }
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        // alert('somthing wrong')
      }
    }

  


  

  return (
    <>
      <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100' style={{backgroundColor:'#ea54f566', height:'930px'}}>
     <div className='my-3'>
                <h3 className='text-black fw-bold'>New Mentors Verification</h3>
           </div>

         <div style={{height:'350px', overflowY:'auto'}}>

       {unverifiedMentors.length==0?
       (<div className="text-center">
              <h5 className="text-muted">No New Mentors yet</h5>
            </div>)
          :
          (  unverifiedMentors?.map((mentor)=>( <div className='mt-4' key={mentor?._id}>
              <div className='d-flex shadow rounded-4 p-4 flex-column'
               style={{backgroundColor:'#8e39f766'}}>
              <div className='d-flex'>
                          <div className='d-flex justify-content-center align-items-center'>
                              <img src="https://as1.ftcdn.net/v2/jpg/02/30/60/82/1000_F_230608264_fhoqBuEyiCPwT0h9RtnsuNAId3hWungP.jpg" alt="no image" height={'100px'} width={'100px'} className='rounded-circle'/>
                          </div>
                          <div className='ms-2'>
                              <h4 className='text-black'>{mentor?.username}</h4>
                              <p>{mentor?.description?.slice(0,20)} .....</p>
                          </div>
                    </div>
                      <div className='d-flex align-items-center justify-content-center'>
                      <button className="btn btn-outline-info p-2 px-5 rounded-4 m shadow" onClick={() => handleShow(mentor)}>Verify Profile</button>
                      </div>
              </div>
  
             </div>)))}
         </div>

           

            {/* Subscriptions */}
         
               <div className='my-4'>
                    <h3 className='text-black fw-bold'>Subscriptions</h3>
               </div>
         <div className='p-3' style={{height:'330px', overflowY:'auto'}}>


        {subscriptions.length == 0 ? (
            <div className="text-center">
              <h5 className="text-muted">No subscriptions yet</h5>
            </div>
          ) : (
            subscriptions.map((subscription, index) => (
              <div className="mt-4" key={index}>
                <div className="d-flex shadow rounded-4 p-3 align-items-center justify-content-center" style={{ backgroundColor: '#8e39f766' }}>
                  <h5 className="text-black">{subscription.email}</h5>
                  <button className="btn ms-auto text-info">
                    <FontAwesomeIcon icon={faEnvelope} className="fs-3" />
                  </button>
                </div>
              </div>
            ))
          )}
    
               
    
              
         </div>
        </div>



        {/* verification modal */}
        <Modal show={show} onHide={handleClose} style={{zIndex:'2000'}} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-black fw-bold'>Mentor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#FF8DA6'}}>
            <div>
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-6 d-flex align-items-center justify-content-center flex-column">
                <img src={selectedMentor.verifyimg?`${serverUrl}/uploads/${selectedMentor.verifyimg}`:"https://woxikon.co.nz/uploads/large-default.jpg"}   alt="no image" height={'150px'} width={'150px'} className='rounded-3'/>
                <h5 className='mt-3 text-black fw-bold'>Live Capture</h5>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center flex-column">
                <img src={selectedMentor.profile?`${serverUrl}/uploads/${selectedMentor.profile}`:"https://woxikon.co.nz/uploads/large-default.jpg"}   alt="no image" height={'150px'} width={'150px'} className='rounded-2' />
                <h5 className='mt-3 text-black fw-bold'>Profile Image</h5>
                </div>
              </div>
             <div className='p-2 mt-3'>
                <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                 <Form.Label column sm="3">
                  Name
                  </Form.Label>
                  <Col sm="9">
                  <Form.Control className='border-2 border-black' type="text" value={selectedMentor.username} placeholder="Name" readOnly />
                   </Col>
                 </Form.Group>

                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                 <Form.Label column sm="3">
                  Email
                  </Form.Label>
                  <Col sm="9">
                  <Form.Control className='border-2 border-black' type="text" value={selectedMentor.email} placeholder="Email" readOnly />
                   </Col>
                 </Form.Group>

                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
                 <Form.Label column sm="3">
                  Description
                  </Form.Label>
                  <Col sm="9">
                  <Form.Control className='border-2 border-black' type="text" value={selectedMentor.description} placeholder="Description" readOnly />
                   </Col>
                 </Form.Group>

                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextWeb">
                   <Form.Label column sm="3">
                      Website
                   </Form.Label>
                  <Col sm="9">
                      <a
                       href={selectedMentor.website}
                      target="_blank"
                      className="form-control border-2 border-black"
                      style={{ display: 'block', padding: '0.375rem 0.75rem', backgroundColor: 'white', color: 'black', textDecoration: 'none' }}
                        >
                       {selectedMentor.website}
                         </a>
                     </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextStatus">
                     <Form.Label column sm="3">
                      Status
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control className='border-2 border-black' type="text" value={selectedMentor.status} placeholder="Description" readOnly />
                       </Col>
                      </Form.Group>
  
                </Form>
             </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Mark as Verified
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AdminSubscriptions