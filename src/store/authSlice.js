import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login } from "../API/authentication";

export const createAccount = createAsyncThunk(
  "auth/signup",
  async (formData) => {
    const submit = await signup(formData);
    return submit;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const user = await login(formData);
  return user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

const savedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: savedUser?.success || false,
    data: savedUser || {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.data = action.payload;

        if (action.payload.success) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.status = false;
        state.data = {};
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
