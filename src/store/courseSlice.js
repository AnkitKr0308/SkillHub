import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addCourse,
  ArchiveCourse,
  editCourse,
  enrollCourse,
  fetchEnrolledCourses,
  getCourseDetails,
  getCourses,
} from "../API/coursesapi";

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

export const getEnrolledCourses = createAsyncThunk(
  "courses/getenrolledcourses",
  async ({ userId, courseId }) => {
    const data = await fetchEnrolledCourses(userId, courseId);
    return data;
  }
);

export const enrollingcourse = createAsyncThunk(
  "courses/enrollcourse",
  async (formData) => {
    const data = await enrollCourse(formData);
    return data;
  }
);

export const editCourseData = createAsyncThunk(
  "courses/editcourse",
  async ({ courseId, formData }) => {
    const data = await editCourse(courseId, formData);
    return data;
  }
);

export const fetchCourseDetails = createAsyncThunk(
  "courses/coursedetails",
  async ({ userId, courseId }) => {
    const data = await getCourseDetails(userId, courseId);
    return data;
  }
);

export const archivecourseslice = createAsyncThunk(
  "courses/archivecourse",
  async (courseId) => {
    await ArchiveCourse(courseId);
    return courseId;
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
      })
      .addCase(getEnrolledCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(enrollingcourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollingcourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(enrollingcourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editCourseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCourseData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (course) => course.courseid === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editCourseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(archivecourseslice.pending, (state) => {
        state.loading = true;
      })
      .addCase(archivecourseslice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (course) => course.courseid === action.payload
        );
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      })
      .addCase(archivecourseslice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
