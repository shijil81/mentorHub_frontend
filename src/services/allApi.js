import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// mentor register
export const mregisterApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/mregister`,reqBody,reqHeader)
}
// user register
export const uregisterApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/uregister`,reqBody,"")
}

// login
export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// update user profile
export const updateUserApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-user`,reqBody,reqHeader)
}
// update mentor profile
export const updateMentorApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-mentor`,reqBody,reqHeader)
}
// update Admin profile
export const updateAdminApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-admin`,reqBody,reqHeader)
}

// get all mentors
export const getAllMentorApi=async()=>{
    return await commonApi('GET',`${serverUrl}/get-mentors`,"","")
}

// update mentor profile
export const verifyMentorApi=async(reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/verify-mentor`,reqBody,"")
}

// upload video by mentor
export const uploadVideoApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/uploads`,reqBody,reqHeader)
}

// get upload by mentors on mentor profile
export const getVideoApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-uploads`,"",reqHeader)
}

// delete uploaded video on mentor profile

export const deleteVideoApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-video/${id}`,{},"")
}

// api to edit video
// export const editVideoApi=async(id,reqBody,reqHeader)=>{
//     return await commonApi('PUT',`${serverUrl}/edit-video/${id}`,reqBody,reqHeader)
// }

// get all verified mentors in user home
export const getverifiedMentorsApi=async()=>{
    return await commonApi('GET',`${serverUrl}/get-vmentors`,"","")
}

// fetch mentor by id
export const getMentorByIdApi=async(id)=>{
    return await commonApi('GET',`${serverUrl}/get-umentor/${id}`,"","")
}

// fetch videos on user profile
export const getVideosByIdApi=async(id)=>{
    return await commonApi('GET',`${serverUrl}/get-muploads/${id}`,"","")
}

// purchase a course
export const addCourseApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/course-purchase`,reqBody,reqHeader)
}
// get added course mentor details
export const getAddedCourse=async(id)=>{
    return await commonApi('GET',`${serverUrl}/user-courses/${id}`,"","")
}

// delete added course by user
export const deleteCourseApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-course/${id}`,{},"")
}

// get user count
export const getUserCount=async()=>{
    return await commonApi('GET',`${serverUrl}/user-count`,"","")
}

// add subscription
export const addSubscriptionApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/subscription`,reqBody,"")
}

// get subscriptions
export const getSubscriptionsApi=async()=>{
    return await commonApi('GET',`${serverUrl}/get-subscription`,"","")
}

// get sub count
export const getSubCount=async()=>{
    return await commonApi('GET',`${serverUrl}/sub-count`,"","")
}

// get students count on mentor profile
export const getStdCountApi=async(id)=>{
    return await commonApi('GET',`${serverUrl}/std-count/${id}`,"","")
}

// get total course enrolled
export const getCourseCountApi=async(id)=>{
    return await commonApi('GET',`${serverUrl}/course-count/${id}`,"","")
}

// fetch previously intracted users
export const getIntractedUsersApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/interacted-users`,"",reqHeader)
}

// fetch chat history for a selected room
export const getChatHistoryApi=async(chatRoom,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/chat/${chatRoom}`,"",reqHeader)
}