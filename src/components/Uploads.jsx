import { React,useEffect,useState } from 'react'
import Form from "react-bootstrap/Form";
import { uploadVideoApi } from '../services/allApi';
import { useDispatch } from 'react-redux';
import { fetchVideos } from '../redux/slices/mentorUploadSlice';
import Swal from 'sweetalert2'

function Uploads({handleClose1}) {
  const dispatch=useDispatch()
    const[uploads,setUploads]=useState({
        status:"RecordedVideo",
        thumbnail:"",
        video:"",
        title:"",
        description:""
    })

    console.log(uploads);
    
    // image url save
  const [preview, setPreview] = useState("");
  // set key for calling onChange function for uploading same file after click cancel
  const [key, setKey] = useState(false);
  const[key1,setKey1]=useState(false)

  


  // edit clear function
  const handleClear = () => {
    setUploads({
        status:"RecordedVideo",
        thumbnail:"",
        video:"",
        title:"",
        description:"",
    });
    setPreview("");

    if (key == false) {
      setKey(true);
    } else {
      setKey(false);
    }
    if (key1 == false) {
        setKey1(true);
      } else {
        setKey1(false);
      }
  };

  // for Image upload
  const handleFile = (e) => {
    setUploads({ ...uploads,thumbnail: e.target.files[0] });
  };
//  video Upload
  const handleVideo = (e) => {
    setUploads({ ...uploads,video: e.target.files[0] });
  };

  const getLink=(e)=>{
    const link=e.target.value
    console.log(link);
    if(link.startsWith('https://youtu.be/')){
      setUploads({...uploads,video:`https://www.youtube.com/embed/${link.slice(17,28)}`})
    }else{
      setUploads({...uploads,video:`https://www.youtube.com/embed/${link.slice(-11)}`})
    }
  }

  // image convert to url to dispaly on modal
  useEffect(() => {
    if (uploads.thumbnail) {
      setPreview(URL.createObjectURL(uploads.thumbnail));
    }
  }, [uploads.thumbnail]);


//   upload function

const handleUpload = async () => {
    const { status,thumbnail,video,title,description } =
      uploads;

    const reqBody = new FormData();
    reqBody.append("status", status);
    reqBody.append("title", title);
    reqBody.append("description", description);
    reqBody.append("thumbnail", thumbnail)
    reqBody.append("video", video);

    const token = sessionStorage.getItem("token");
    if (token) {
      
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await uploadVideoApi(reqBody, reqHeader);
        console.log(result);
        if (result.status == 200) {
          dispatch(fetchVideos())
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Uploaded successfully",
            showConfirmButton: false,
             timer: 2000
          });
          // alert("Uploaded successfully");
          handleClose1();
          
        } else {
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Something went wrong!"
          });
          // alert("Somthing Went Wrong");
        }
    } else {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Something went wrong!"
      });
      // alert("somthing wrong");
    }
  };



  return (
    <>

<div className="d-flex justify-content-center align-items-center flex-column">
            <Form.Group>
              <h5 className="text-center text-black fw-bold">
                Select Your Uploaded Type
              </h5>
              <div className="d-flex  align-items-center my-3">
                <Form.Check
                  type="radio"
                  label="Recorded Video"
                  name="videoStatus"
                  value="RecordedVideo"
                  checked={uploads.status === "RecordedVideo"}
                  onChange={(e) =>
                    setUploads({ ...uploads, status: e.target.value })
                  }
                  className="fw-bold text-black me-md-3"
                />
                <Form.Check
                  type="radio"
                  label="YouTube Link"
                  name="videoStatus"
                  value="YouTubeLink"
                  checked={uploads.status === "YouTubeLink"}
                  onChange={(e) => setUploads({ ...uploads, status: e.target.value })}
                  className="fw-bold text-black me-md-3"
                />
              </div>
            </Form.Group>

            <div className="container">
              <div className="row">
                {/* Image Section */}
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mb-3 mb-md-0">
                 <label htmlFor="videoImg">
                  <input type="file"
                  id="videoImg"
                  style={{display:"none"}}
                  key={key}
                  onChange={(e)=>handleFile(e)}
                   />
                    <img
                      src={preview?preview:"https://i.ytimg.com/vi/ICy1ZcyEGgI/maxresdefault.jpg"}
                      alt="thumbnail"
                      style={{
                        height: "200px",
                        width: "100%",
                        maxWidth: "300px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    />
                 </label>
                </div>

                {/* Form Section */}
                <div className="col-12 col-md-6 mt-3">
                  <div className="form-group">
                    {uploads.status === "RecordedVideo" ? (
                      <input
                        type="file"
                        className="form-control mb-3"
                        key={key1}
                        placeholder="Upload Video"
                        onChange={(e)=>handleVideo(e)}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control mb-3"
                        value={uploads.video}
                        placeholder="Youtube Link"
                        onChange={(e)=>getLink(e)}
                      />
                    )}

                    <input
                      type="text"
                      className="form-control mb-3"
                      value={uploads.title}
                      placeholder="Title"
                      onChange={(e)=>setUploads({...uploads,title:e.target.value})}
                    />

                    <input
                      type="text"
                      className="form-control mb-3"
                      value={uploads.description}
                      placeholder="Description"
                      onChange={(e)=>setUploads({...uploads,description:e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

          <div className='d-flex justify-content-center align-items-center my-3'>
              <button className='btn btn-secondary me-3' onClick={handleClear}>Clear </button>
              <button className='btn btn-success' onClick={handleUpload}>Upload</button>
          </div>
        
          </div>
      
    </>
  )
}

export default Uploads
