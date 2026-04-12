import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAction from "./authAction";
// @ts-ignore
import { removeToken, setToken } from "../../../services/utils";

// Initial state
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await authAction.loginUser(data);
      const responseData = response.data || response;
      
      // Extract token from nested data structure
      if (responseData?.data?.token) {
        setToken(responseData.data.token);
      }
      
      return responseData;
    } catch (error: any) {
      const errorData = error?.response?.data || {};
      return rejectWithValue({
        message: errorData?.message || error?.response?.data?.message || "Login failed",
        statusCode: errorData?.statusCode || error?.response?.status || 500,
        data: errorData?.data || null
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await authAction.registerUser(data);
      return response.data || response;
    } catch (error: any) {
      // Extract error message from various response formats
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data || 
        error?.message ||
        "Registration failed";
      
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response: any = await authAction.emailVerification(token);
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Email verification failed" }
      );
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await authAction.forgetPassword(data);
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Forgot password failed" }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (params: any, { rejectWithValue }) => {
    try {
      const response: any = await authAction.resetPassword(params);
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Reset password failed" }
      );
    }
  }
)
export const resendEmailVerification = createAsyncThunk(
  "auth/resendVerification",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await authAction.resendVerification(data);
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Resend verification failed" }
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await authAction.getMe();
      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = "Logged out successfully";
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.user = payload?.data?.user || payload?.user || null;
        state.isAuthenticated = true;
        state.message = payload?.message || "Login successful";
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload?.data?.token) {
          setToken(payload.data.token);
          state.user = payload.data.user;
          state.isAuthenticated = true;
          state.message = payload.message || "Email verified and logged in successfully";
        } else {
          state.message = payload?.message || "Email verified successfully";
        }
      })
      .addCase(verifyEmail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Email verification failed";
      })

      // Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Reset link sent";
      })
      .addCase(forgetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Forgot password failed";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Reset password failed";
      })
      
      // Resend Verification
      .addCase(resendEmailVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Verification email resent";
      })
      .addCase(resendEmailVerification.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Resend failed";
      })
      
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.user = payload?.data?.user || payload?.user || null;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        removeToken();
      });
  },
});

export const { clearAuthState, logout } = auth.actions;
export default auth.reducer;
