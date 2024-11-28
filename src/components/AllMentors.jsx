import { faCircleCheck,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React,useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getverifiedMentorsApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';


function AllMentors() {
  const [mentors,setMentors]=useState([])
  const [loading,setLoading]=useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // fetch verified mentors
  const fetchMentors=async()=>{
    try {
      const response=await getverifiedMentorsApi()
      if(response.status==200){
        setMentors(response.data) 
        // console.log(response.data);
        
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchMentors()
  },[])

  // Filter mentors based on search term
  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(loading){
    return <div>Loading........</div>
  }
  
  return (
    <>
      <div className="container">
      <div className="row mt-5 mb-4">
        <div className="col-md-1"></div>
        <div className="col-md-6 d-flex justify-conent-center align-items-center">
          <h3 className='fw-bold text-black'>Find Your Mentor Here...</h3>
        </div>
        <div className="col-md-4 d-flex justify-conent-center align-items-center">
          <input type="text" className='w-100 rounded-5 border-black form-control py-1 text-center shadow' placeholder='Search your field / mentor name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          />
           <FontAwesomeIcon icon={faMagnifyingGlass} className='fs-5' style={{marginLeft:'-30px'}}/>
    
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>

    <div className="container">
        <div className="row my-5">
          {/* Render filtered mentors */}
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div className="col-md-4 d-flex align-items-center justify-content-center mt-5" key={mentor._id}>
                <Card style={{ width: '100%' }} className='rounded-5 shadow border-0 p-4'>
                  <div className='d-flex justify-content-center align-items-center m-2'>
                    <Card.Img
                      variant="top"
                      src={mentor.profile ? `${serverUrl}/uploads/${mentor.profile}` : "https://woxikon.co.nz/uploads/large-default.jpg"}
                      className='rounded-circle'
                      style={{ width: '150px', height: '150px' }}
                    />
                  </div>
                  <Card.Body className='text-center'>
                    <Card.Title>
                      <h4 className='fw-bold'>
                        {mentor.username} <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} />
                      </h4>
                      <h5 className='fw-bold text-black'>{mentor.profession}</h5>
                    </Card.Title>
                    <Card.Text>
                      {mentor.description?.slice(0,90)}...
                    </Card.Text>
                    <Link to={`/mview/${mentor._id}`}>
                      <Button variant="primary">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center">No mentors found...</div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllMentors
