import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteUser, getAllUsers, UpdateUser } from "../API/user";

export const fetchAllUsers = createAsyncThunk("users/getUsers", async () => {
  return await getAllUsers();
});

export const editUsers = createAsyncThunk(
  "users/editUser",
  async ({ userId, formData }) => {
    const data = await UpdateUser(userId, formData);
    return data;
  }
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId) => {
    const data = await DeleteUser(userId);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data?.id) {
          const userId = action.payload.data.id;
          state.users = state.users.filter((user) => user.id !== userId);
        } else {
          state.error = action.payload.message || "Delete failed";
        }
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
