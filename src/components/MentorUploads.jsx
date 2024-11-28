import { React,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos } from '../redux/slices/mentorUploadSlice';
import { serverUrl } from '../services/serverUrl';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { deleteVideoApi } from '../services/allApi';
import Swal from 'sweetalert2'




function MentorUploads() {
  const dispatch=useDispatch()

   // Select the videos and loading status from the Redux store
   const videos = useSelector((state) => state.videos.videos);
   const videoStatus = useSelector((state) => state.videos.status);
   const videoError = useSelector((state) => state.videos.error);

    // State to manage video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch videos when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

   

     // Function to handle thumbnail click and show video
  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowVideoModal(true);
  };

  // delete video
  const handleDelete =async(id)=>{
    const result= await deleteVideoApi(id)
    if(result.status==200){
      dispatch(fetchVideos());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
         timer: 2000
      });
      // alert('Deleted Successfully')
    }else{
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
    }

    


  

 
 // Handle loading state
 if (videoStatus === 'loading') {
  return <div>Loading videos...</div>;
}

// Handle error state
if (videoStatus === 'failed') {
  return <div>Error fetching videos: {videoError}</div>;
}


  return (
    <>
       <div className='d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100' style={{backgroundColor:'#8e39f766', height:'975px'}}>
           <div className='my-3'>
                <h3 className='text-black fw-bold'>Uploads</h3>
           </div>

          {videos?.length>0?<div style={{height:'875px', overflowY:'auto'}}>
             {videos.map((video)=>(
              <div key={video._id} className='d-flex align-items-center justify-content-center mt-4 me-3'>
              <div className='d-flex shadow rounded-4 p-4 flex-column w-100' style={{backgroundColor:'#ea54f566'}}>
                    <div className='d-flex'>
                          <div className='d-flex justify-content-center align-items-center'>
                              <img src={video.thumbnail?`${serverUrl}/uploads/thumbnail/${video.thumbnail}`:"https://woxikon.co.nz/uploads/large-default.jpg"} alt="Video thumbnail" height={'100px'} width={'100px'} className='rounded-4'
                              onClick={() => {
                                // Conditional rendering based on video.status
                                const videoUrl = video.status === "YouTubeLink"
                                  ? `${video?.video}?autoplay=1` // YouTube link with autoplay
                                  : `${serverUrl}/uploads/videos/${video.video}`; // Video from your server
                                
                                handleThumbnailClick(videoUrl); // Pass the URL to the function
                              }}
                              style={{ cursor: 'pointer' }}
                              />
                          </div>
                          <div className='ms-2'>
                              <h6 className='text-black'>{video.title?.slice(0,45)}</h6>
                              <p>{video.description?.slice(0,40)}</p>
                          </div>
                    </div>
                      <div className='d-flex align-items-center justify-content-center mt-3'>
                      <button className='btn btn-danger p-2 px-5 rounded-4 me-2' onClick={()=>handleDelete(video._id)}>Delete</button>
                     
                      </div>
              </div>
  
             </div>
             ))}
          </div>
            :
          <div className='d-flex justify-content-center align-items-center flex-column'>
              <h4 className='text-center text-black fw-bold'>No Uploads <FontAwesomeIcon icon={faSpinner} spinPulse className='text-danger fw-bold fs-3 ms-3'/></h4>
              <p >Please Upload some content to inspire the world</p>
          </div>}

        </div>


        {/* video play modal */}
        <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)} centered size="lg" style={{zIndex:'2000'}}>
        <Modal.Header closeButton>
          <Modal.Title>Play Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedVideo && (
      <>
        {/* Check if the video is a YouTube URL */}
        {selectedVideo.includes("youtube.com") || selectedVideo.includes("youtu.be") ? (
          <iframe
            width="100%"
            height="480px"
            src={`${selectedVideo}?autoplay=1`} // Auto-play YouTube video
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video"
            style={{
              maxHeight: '80vh',
              maxWidth: '100%'
            }}
          />
        ) : (
          // If it's an MP4 video, use the video tag
          <video
            width="100%"
            style={{
              maxHeight: '80vh',
              maxWidth: '100%'
            }}
            controls
          >
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </>
    )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>





             
    </>
  )
}

export default MentorUploads
