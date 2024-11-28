import React, { useEffect, useState } from "react";

import { deleteCourseApi, getAddedCourse } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

function UserCourses() {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));

  const fetchCourse = async () => {
    try {
      const id = existingUser;
      const response = await getAddedCourse(id);

      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); //stop loading
    }
  };

   // delete course
   const handleDelete =async(id)=>{
    const result= await deleteCourseApi(id)
    if(result.status==200){
      fetchCourse()
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

  useEffect(() => {
    fetchCourse();
  }, []);

  if (loading) {
    return <div className="w-100">
     
      <div
        className="d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100"
        style={{ backgroundColor: "#8e39f766",  height:'975px'}}
      >
        <div className="my-3">
          <h3 className="text-black fw-bold">Courses</h3>
        </div>

        <h4 className="mt-5 text-black fw-bold">Loading....</h4>
      </div>
      </div>;
  }
  return (
    <>
      <div
        className="d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100"
        style={{ backgroundColor: "#8e39f766",  height:'975px'}}
      >
        <div className="my-3">
          <h3 className="text-black fw-bold">Courses</h3>
        </div>

        {courses?.length === 0 ? (
          <div className="mt-5">No courses found.</div> // Show message if no courses found
        ) : (
          courses?.map((course) => (
            <div className="d-flex align-items-center justify-content-center mt-4 w-100" key={course._id}>
              <div
                className="d-flex shadow rounded-4 p-4 flex-column w-100"
                style={{ backgroundColor: "#ea54f566" }}
              >
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={
                        course.mentorId.profile
                          ? `${serverUrl}/uploads/${course.mentorId.profile}`
                          : "https://woxikon.co.nz/uploads/large-default.jpg"
                      }
                      alt="no image"
                      height={"100px"}
                      width={"100px"}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="ms-2">
                    <h4 className="text-black">{course?.mentorId.username}</h4>
                    <p>{course?.mentorId.description?.slice(0,45)}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-3">
                 <Link to={`/addedcourse/${course?.mentorId._id}`}>
                    <button className="custom-cr p-2 px-4 rounded-4 m shadow me-4">
                      View
                    </button>
                 </Link>
                  <button className="btn btn-outline-danger p-2 px-4 rounded-4 m shadow" onClick={()=>handleDelete(course._id)}>
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default UserCourses;
