import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup as apiSignup,
  login as apiLogin,
  getAllUsers as apiGetAllUsers,
  getUserById as apiGetUserById,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../api";

const initialState = {
  userInfo: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
  usersList: [],
};

export const signupUser = createAsyncThunk("user/signup", async (userData) => {
  const response = await apiSignup(userData);
  return response.data;
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  const response = await apiLogin(userData);
  return response.data;
});

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (token) => {
    const response = await apiGetAllUsers(token);
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async ({ id, token }) => {
    const response = await apiGetUserById(id, token);
    return response.data;
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ id, userData, token }) => {
    const response = await apiUpdateUser(id, userData, token);
    return response.data;
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async ({ id, token }) => {
    const response = await apiDeleteUser(id, token);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    //  user
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userInfo = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userInfo = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Fetch all users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Fetch user by ID
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Update user by ID
    builder
      .addCase(updateUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Delete user by ID
    builder
      .addCase(deleteUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each reducer
export const { logout } = userSlice.actions;

// Selectors
export const selectUserInfo = (state) => state.user.userInfo;
export const selectToken = (state) => state.user.token;
export const selectUsersList = (state) => state.user.usersList;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
