import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVideoApi } from "../../services/allApi";
import Swal from 'sweetalert2'

// fetch videos 
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); // Example of retrieving token
      if(token){
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // Pass token with authorization
          };
          const response = await getVideoApi(reqHeader);
          console.log(response);
    
          return response.data;  // Return fetched videos data

      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please login!"
        });
        // alert('please login')
      }
     
      
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to fetch videos');
    }
  }
);

// createSlice to manage
const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],      // List of videos
    status: 'idle',  // idle | loading | succeeded | failed
    error: null      // Error handling
  },
  reducers: {
    addVideo: (state, action) => {
      state.videos.push(action.payload); // Add video to the list in state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';  // Set loading status
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';  
        state.videos = action.payload; // Update state with fetched videos
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.payload;  // Update error if fetching fails
      });
  }
});

// Export the action to add a video
export const { addVideo } = videoSlice.actions;

// Export the reducer to use in the store
export default videoSlice.reducer;
