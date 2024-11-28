import {
  faPenToSquare,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, React } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getSubCount, getUserCount, updateAdminApi, updateUserApi } from "../services/allApi";
import { updateUser } from "../redux/slices/userSlice";
import { serverUrl } from "../services/serverUrl";
import Swal from "sweetalert2";

function AdminProfile() {
  // get data from redux store
  const user = useSelector((state) => state.user.userInfo);
  const {mentors,status,error}=useSelector((state)=>state.mentors)

  const [totalUsers,setTotalUsers]=useState(0)
  const [totalSub,setTotalSub]=useState(0)

  // call dispatch for update store
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [see, setSee] = useState(false);
  // data display on profile
  const [userProfile, setUserProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    profile: user?.profile || "",
  });

  // data taken from modal
  const [editProfile, setEditProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    profile: "",
  });

  // image url save
  const [preview, setPreview] = useState("");
  // set key for calling onChange function for uploading same file after click cancel
  const [key, setKey] = useState(false);

  // modal functions
  const handleClose = () => {
    setShow(false);
    handleClear();
  };
  const handleShow = () => setShow(true);

  // password show hide
  const handleClick = () => {
    setSee(!see);
  };

  // edit clear function
  const handleClear = () => {
    setEditProfile({
      username: user?.username || "",
      email: user?.email || "",
      password: user?.password || "",
      profile: "",
    });
    setPreview("");

    if (key == false) {
      setKey(true);
    } else {
      setKey(false);
    }
  };

  // for Image upload
  const handleFile = (e) => {
    setEditProfile({ ...editProfile, profile: e.target.files[0] });
  };

  // image convert to url to dispaly on modal
  useEffect(() => {
    if (editProfile.profile) {
      setPreview(URL.createObjectURL(editProfile.profile));
    }
  }, [editProfile.profile]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        username: user.username,
        email: user.email,
        password: user.password,
        profile: user.profile,
      });
    }
  }, [user]);
  // update profile

  const handleEdit = async () => {
    const { username, email, password, profile } = editProfile;

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("email", email);
    reqBody.append("password", password);
    preview
      ? reqBody.append("profile", profile)
      : reqBody.append("profile", user.profile);

    const token = sessionStorage.getItem("token");
    if (token) {
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await updateAdminApi(reqBody, reqHeader);
        console.log(result);
        if (result.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edited successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          alert("Edited successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          dispatch(updateUser(result.data));
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          // alert("Somthing Went Wrong");
        }
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await updateAdminApi(reqBody, reqHeader);
        console.log(result);
        if (result.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edited successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          // alert("Edited successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          dispatch(updateUser(result.data));
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          // alert("Somthing Went Wrong");
        }
      }
    }
  };

  // fetch user count

  const fetchUserCount=async()=>{
    const result=await getUserCount()
    if(result.status==200){
      setTotalUsers(result.data.count)
    }
    else{
      console.log('somthing went wrong while fetching user count');
      
    }
  }

// fetch subscription count
  const fetchSubCount=async()=>{
    const result=await getSubCount()
    if(result.status==200){
      setTotalSub(result.data.count)
    }else{
      console.log('somthing went wrong while fetching user count');
      
    }
  }

  useEffect(()=>{
    fetchUserCount()
    fetchSubCount()
  },[])

  const verifiedMentors = mentors.filter(mentor => mentor.status === 'verified');

  return (
    <>
      <div
        className="d-flex flex-column my-5 p-4 shadow-lg rounded-5"
        style={{ backgroundColor: "#ea54f566", overflowX:'hidden'}}
      >
        <div className="ms-auto">
          <button className="btn text-black" onClick={handleShow}>
            <FontAwesomeIcon icon={faPenToSquare} className="fs-4" />
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column m-3">
          <img
            src={
              userProfile.profile
                ? `${serverUrl}/uploads/${userProfile.profile}`
                : "https://woxikon.co.nz/uploads/large-default.jpg"
            }
            alt="no image"
            height={"150px"}
            width={"150px"}
            className="rounded-circle"
          />
          <h4 className="text-black">Name : {userProfile.username} </h4>
          <h3 className="text-black">Email:{userProfile.email} </h3>
          <div className="my-2 d-flex justify-content-between align-items-center">
            <div
              className="shadow-lg rounded-4 text-center px-2 py-1"
              style={{ backgroundColor: "#9a68f7", width: "10 0px" }}
            >
              <h2 className="text-black mt-2">{verifiedMentors?(verifiedMentors?.length):0}</h2>
              <p>
                Total
                <br />
                Mentors
              </p>
            </div>
            <div
              className="shadow-lg rounded-4 text-center px-2 py-1 ms-2"
              style={{ backgroundColor: "#9a68f7", width: "100px" }}
            >
              <h2 className="text-black mt-2">{totalUsers?(totalUsers):0}</h2>
              <p>
                Total
                <br />
                Students
              </p>
            </div>
            <div
              className="shadow-lg rounded-4 text-center px-2 py-1 ms-2"
              style={{ backgroundColor: "#9a68f7", width: "120px" }}
            >
              <h2 className="text-black mt-2">{totalSub?(totalSub):0}</h2>
              <p>
                Total
                <br />
                Subscription
              </p>
            </div>
          </div>
          <div
            style={{ width: "75%", height: "3px", backgroundColor: "red" }}
            className="my-3"
          ></div>
        </div>

        <div
          className="shadow rounded-4 d-flex justify-content-center align-items-center flex-column p-4"
          style={{ backgroundColor: "#9a68f7" }}
        >
          <img src="/analyse.png" alt="" height={"200px"} width={"100%"} />
          <h2 className="mt-2 text-white text-center">
            View Website Analytics?
          </h2>
          <button
            className="custom-cr p-2 px-5 rounded-4 mt-3 shadow fw-bold"
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Sorry",
                text: "This feature is currently not available!"
              })
            }
          >
            View
          </button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ zIndex: "2000" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-black">
            Edit your Profile here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="d-flex justify-content-center">
            <label htmlFor="projImg">
              <input
                type="file"
                id="projImg"
                style={{ display: "none" }}
                key={key}
                onChange={(e) => handleFile(e)}
              />
              <img
                src={
                  preview
                    ? preview
                    : user.profile
                    ? `${serverUrl}/uploads/${user.profile}`
                    : "https://woxikon.co.nz/uploads/large-default.jpg"
                }
                alt="no image"
                height={"150px"}
                width={"150px"}
                className="rounded-circle mb-3"
              />
            </label>
          </div>

          <div>
            <Form.Floating className="mb-3">
              <Form.Control
                id="username"
                type="text"
                placeholder="Username"
                value={editProfile.username}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, username: e.target.value })
                }
              />
              <label htmlFor="username">Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="email"
                value={editProfile.email}
                type="email"
                placeholder="Email address"
                readOnly
              />
              <label htmlFor="email">Email address</label>
            </Form.Floating>

            <Form.Floating className="mb-3 position-relative">
              <Form.Control
                id="password"
                value={editProfile.password}
                type={see ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setEditProfile({ ...editProfile, password: e.target.value })
                }
              />
              <label htmlFor="password">Password</label>
              <p
                className="fs-4 position-absolute"
                onClick={handleClick}
                style={{
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-55%)",
                }}
              >
                {see ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </p>
            </Form.Floating>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <button
            className="custom-rg p-2 px-3 rounded mx-3"
            onClick={handleClear}
          >
            Cancel
          </button>
          <button
            type="button"
            className="custom-lg p-2 px-3 rounded fw-bold"
            onClick={handleEdit}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminProfile;
