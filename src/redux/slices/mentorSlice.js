// for Verify and Controll Mentors In Admin Pannel

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMentorApi } from "../../services/allApi";

// to fetch all mentors api call using async thunk
export const getMentors=createAsyncThunk(
   'mentors/getMentors',
   async(_,{rejectWithValue})=>{
    try {
        const response=await getAllMentorApi()
        // console.log(response);
        
        return response.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
   } 
)

// create slice

const mentorSlice=createSlice({
    name:'mentors',
    initialState: {
    mentors: [],
    status: 'idle',
    error: null,
    },
    reducers:{
        updateMentorStatus:(state,action)=>{
            const{id,status}=action.payload
            const mentor=state.mentors.find((mentor)=>mentor._id===id)
            if(mentor){
                mentor.status=status
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMentors.pending,(state)=>{state.status='loading'})//Api call started
        .addCase(getMentors.fulfilled, (state, action) => {
            state.status = 'succeeded';  // API call succeeded
            state.mentors = action.payload;  // Store the fetched data
          })
          .addCase(getMentors.rejected, (state, action) => {
            state.status = 'failed';  // API call failed
            state.error = action.payload;  // Store the error message
          });
    }

})

export const {updateMentorStatus}=mentorSlice.actions

export default mentorSlice.reducer