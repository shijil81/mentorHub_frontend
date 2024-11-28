import { faPenToSquare,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect,React  } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getCourseCountApi, updateUserApi } from '../services/allApi';
import { updateUser } from '../redux/slices/userSlice';
import { serverUrl } from '../services/serverUrl';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';




function UserProfile() {
  // get data from redux store
  const user=useSelector((state)=>state.user.userInfo)

  // call dispatch for update store
  const dispatch=useDispatch()

  const[totalCourse,setTotalCourse]=useState(0)

  const [show, setShow] = useState(false);
  const [see,setSee]=useState(false)
  // data display on profile
  const[userProfile,setUserProfile]=useState({
    username:user?.username || "",
    email:user?.email || "",
    password:user?.password || "",
    profession:user?.profession || "",
    description:user?.description ||"",
    profile:user?.profile ||""
  })


  // data taken from modal
  const [editProfile,setEditProfile]=useState({
    username:user?.username || "",
    email:user?.email || "",
    password:user?.password || "",
    profession:user?.profession || "",
    description:user?.description ||"",
    profile:""
  })
  console.log(editProfile);
  // image url save
  const [preview,setPreview]=useState("")
  // set key for calling onChange function for uploading same file after click cancel
  const [key,setKey]=useState(false)
  

  // modal functions
  const handleClose = () =>{ 
    setShow(false)
    handleClear()
  }
  const handleShow = () => setShow(true);

  // password show hide
  const handleClick=()=>{
    setSee(!see)
  }

  // edit clear function
  const handleClear=()=>{
    setEditProfile({
    username:user?.username || "",
    email:user?.email || "",
    password:user?.password || "",
    profession:user?.profession || "",
    description:user?.description ||"",
    profile:""
    })
    setPreview("");

    if(key==false){
      setKey(true)
    }else{
      setKey(false)
    }
  }

  // for Image upload
  const handleFile=(e)=>{
    setEditProfile({...editProfile,profile:e.target.files[0]})
  }

  // image convert to url to dispaly on modal
  useEffect(()=>{
    if(editProfile.profile){
      setPreview(URL.createObjectURL(editProfile.profile))
    }
  },[editProfile.profile])

  useEffect(() => {
    if (user) {
      setUserProfile({
        username: user.username,
        email: user.email,
        password: user.password,
        profession:user?.profession,
        description: user.description,
        profile: user.profile
      });
    }
  }, [user]);
  // update profile

  const handleEdit=async()=>{
    const {username,email,password,profession,description,profile}=editProfile
  
      const reqBody= new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("profession",profession)
      reqBody.append("description",description)
      preview?reqBody.append("profile",profile):reqBody.append("profile",user.profile)

      const token = sessionStorage.getItem("token")
      if(token){
      if(preview){ 
       const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result=await updateUserApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edited successfully",
            showConfirmButton: false,
             timer: 2000
          });
          // alert('Edited successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data._id));
          dispatch(updateUser(result.data));
          handleClose()
        }else{
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Something went wrong!"
          });
          // alert('Somthing Went Wrong')
        }
        
        
      }else{
       const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result=await updateUserApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edited successfully",
            showConfirmButton: false,
             timer: 2000
          });
          // alert('Edited successfully')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data._id));
          dispatch(updateUser(result.data));
          handleClose()
        }else{
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Something went wrong!"
          });
          // alert('Somthing Went Wrong')
        }
        
      }

      }else{
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Something went wrong!"
        });
        // alert('somthing wrong')
      }

  }

    // fetch Course Count
    const fetchCourseCount=async()=>{
      const id=user._id
      const result = await getCourseCountApi(id)
      if(result.status==200){
        setTotalCourse(result.data.count)
      }else{
        console.log('somthing went wrong while fetching student count');
        
      }
    }
  
    useEffect(()=>{
      fetchCourseCount()
    },[])




    
  return (
    <>
        <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5' style={{backgroundColor:'#ea54f566'}}>
        <div className='ms-auto'><button className='btn text-black' onClick={handleShow}><FontAwesomeIcon icon={faPenToSquare} className='fs-4'/></button></div>
            <div className="d-flex justify-content-center align-items-center flex-column m-3">
                    <img src={userProfile.profile?`${serverUrl}/uploads/${userProfile.profile}`:"https://woxikon.co.nz/uploads/large-default.jpg"}  alt="no image" height={'150px'} width={'150px'} className='rounded-circle mb-3' />
                    <h4 className='text-black'>{userProfile.username}</h4>
                    <p>{userProfile.profession}</p>
                    <div className='my-2 d-flex justify-content-between align-items-center'>
                        <div className='shadow-lg rounded-4 text-center px-2 py-1' style={{backgroundColor:'#9a68f7', width:'100px'}}>
                            <h2 className='text-black mt-2'>{totalCourse?(totalCourse):0}</h2>
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
            </div>
    
            <div className='shadow rounded-4 d-flex justify-content-center align-items-center flex-column p-4'style={{backgroundColor:'#9a68f7'}}>
                <img src="/search.png" alt="" height={'150px'} width={'150px'}/>
                <h2 className='mt-2 text-white'>Looking for new skills?</h2>
                <p className='text-center text-black mt-2'>Explore the offering of advanced courses,<br/>designed to elevate your skills!</p>
                <Link to={'/allmentors'}><button className="custom-cr p-2 px-3 rounded-4 mt-3 shadow">View Courses</button></Link>
            </div>
        </div>


        {/* Profile Edit Modal */}
        <Modal  show={show} onHide={handleClose} centered style={{zIndex:'2000'}}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold text-black'>Edit your Profile here</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
        <div className='d-flex justify-content-center'>

            <label htmlFor='projImg'>
                <input type="file" id='projImg' style={{display:'none'}} key={key}  onChange={(e)=>handleFile(e)} />
                <img  src={preview?preview:user.profile?`${serverUrl}/uploads/${user.profile}`:"https://woxikon.co.nz/uploads/large-default.jpg"} alt="no image" height={'150px'} width={'150px'} className='rounded-circle mb-3' />
            </label>


            </div>

            <div>
                <Form.Floating className="mb-3">
                     <Form.Control id="username" type="text"
                      placeholder="Username"
                      value={editProfile.username}
                      onChange={(e)=>setEditProfile({...editProfile,username:e.target.value})}/>
                     <label htmlFor="username">Name</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                     <Form.Control id="email" 
                     value={editProfile.email}
                     type="email" placeholder="Email address" readOnly/>
                     <label htmlFor="email">Email address</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3 position-relative">
                     <Form.Control id="password" 
                     value={editProfile.password}
                     type={see?"text":"password"}
                     placeholder="Password"
                     onChange={(e)=>setEditProfile({...editProfile,password:e.target.value})}/>
                     <label htmlFor="password">Password</label>
                     <p className='fs-4 position-absolute' onClick={handleClick} style={{ right: '15px', top: '50%', transform: 'translateY(-55%)' }}>
                    {see? 
                    <FontAwesomeIcon icon={faEyeSlash}  />
                    :
                    <FontAwesomeIcon icon={faEye} />
                  }
                  </p>
                   
                 
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                     <Form.Control id="profession" 
                     value={editProfile.profession}
                     type="text" placeholder="Profession"
                     onChange={(e)=>setEditProfile({...editProfile,profession:e.target.value})}/>
                     <label htmlFor="email">Email address</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                     <Form.Control id="description" type="text" 
                     value={editProfile.description}
                     placeholder="Description"
                     onChange={(e)=>setEditProfile({...editProfile,description:e.target.value})}/>
                     <label htmlFor="profession">Description</label>
                 </Form.Floating>

                
             </div>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <button className="custom-rg p-2 px-3 rounded mx-3" onClick={handleClear}>Cancel</button>
          <button type='button' className="custom-lg p-2 px-3 rounded fw-bold" onClick={handleEdit}>Update</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserProfile


