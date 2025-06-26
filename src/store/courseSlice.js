import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addCourse, getCourses } from "../API/coursesapi";

export const fetchAllCourses = createAsyncThunk(
  "courses/getCourses",
  async () => {
    const courseData = await getCourses();
    return courseData;
  }
);

export const addCourseDetails = createAsyncThunk(
  "courses/addcourse",
  async (formData) => {
    const data = await addCourse(formData);
    return data;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(addCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
