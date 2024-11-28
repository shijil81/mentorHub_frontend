import  { React,useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getVideosByIdApi } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";
import Modal from 'react-bootstrap/Modal';


function AllVideo({ mentorId }) {
  const [videos, setVideos] = useState();

  // State to manage video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      const response = await getVideosByIdApi(mentorId);
      setVideos(response.data);
    } catch (error) {
      console.log(error);
    }
  };


    // Function to handle thumbnail click and show video
    const handleThumbnailClick = (videoUrl) => {
      setSelectedVideo(videoUrl);
      setShowVideoModal(true);
    };


  useEffect(() => {
    if (mentorId) {
      fetchVideos();
    }
  }, [mentorId]);

    

  return (
    <>
      <div className="container">
        <div className="row my-3">
          {videos?.length > 0 ? (
            videos.map((video, index) => (
              <div className="col-md-4 d-flex align-items-center justify-content-center mt-5" key={video._id}>
                <Card
                  style={{ width: "100%", backgroundColor: "whitesmoke" }}
                  className="rounded-5 shadow border-0 p-4"
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      variant="top"
                      src={
                        video.thumbnail
                          ? `${serverUrl}/uploads/thumbnail/${video.thumbnail}`
                          : "https://woxikon.co.nz/uploads/large-default.jpg"
                      }
                      className="rounded-3"
                      style={{
                        width: "100%",
                        height: "200px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Conditional rendering based on video.status
                        const videoUrl =
                          video.status === "YouTubeLink"
                            ? `${video?.video}?autoplay=1` // YouTube link with autoplay
                            : `${serverUrl}/uploads/videos/${video.video}`; // Video from your server

                        handleThumbnailClick(videoUrl); // Pass the URL to the function
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <h5 className="fw-bold">{video.title}</h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No videos available</p>
            </div>
          )}
        </div>
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
  );
}

export default AllVideo;
