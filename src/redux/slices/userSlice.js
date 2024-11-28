// For Controlling every login and update Profile

import { createSlice } from "@reduxjs/toolkit";



const userSlice=createSlice({
    name:'user',
    initialState:{},
    reducers:{
        // Action to store user data when logged in
        loginUser:(state,action)=>{
            state.userInfo=action.payload;
        },
        // Action to update user data when edited in the profile
        updateUser:(state,action)=>{
            state.userInfo={...state.userInfo,...action.payload};
        },
        // Action to log out and clear user data
        logoutUser:(state)=>{
            state.userInfo={};
        }
    }
})

// Export action
export const {loginUser,updateUser,logoutUser}=userSlice.actions

// export reducer
export default userSlice.reducer;