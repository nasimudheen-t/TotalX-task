import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

// Mock local database helper
const getMockUsers = (): Record<string, User> => {
  const users = localStorage.getItem('topx_mock_users');
  if (!users) {
    // Seed default user
    const defaultUsers: Record<string, User> = {
      '9876543210': {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      },
    };
    localStorage.setItem('topx_mock_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(users);
};

const saveMockUser = (user: User) => {
  const users = getMockUsers();
  users[user.phone] = user;
  localStorage.setItem('topx_mock_users', JSON.stringify(users));
};

const initialState: AuthState = {
  phone: '',
  otp: '',
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Thunks
export const sendOtp = createAsyncThunk<string, string, { rejectValue: string }>(
  'auth/sendOtp',
  async (phone, { rejectWithValue }) => {
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        return rejectWithValue('Phone number must be exactly 10 digits.');
      }
      
      return phone;
    } catch (err) {
      return rejectWithValue('Failed to send OTP. Please try again.');
    }
  }
);

interface VerifyOtpResponse {
  user: User | null;
  isRegistered: boolean;
}

export const verifyOtp = createAsyncThunk<VerifyOtpResponse, string, { state: { auth: AuthState }; rejectValue: string }>(
  'auth/verifyOtp',
  async (otp, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const { phone } = getState().auth;

      if (otp !== '123456') {
        return rejectWithValue('Invalid OTP. Use "123456" for testing.');
      }

      const users = getMockUsers();
      console.log("user",users)
      const user = users[phone] || null;

      return {
        user,
        isRegistered: !!user,
      };
    } catch (err) {
      return rejectWithValue('Verification failed. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk<User, { name: string; email: string; avatar: string }, { state: { auth: AuthState }; rejectValue: string }>(
  'auth/registerUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { phone } = getState().auth;
      if (!phone) {
        return rejectWithValue('Phone number is missing. Please restart login.');
      }

      const newUser: User = {
        name: userData.name,
        email: userData.email,
        phone,
        avatar: userData.avatar,
      };

      // Save user to mock DB
      saveMockUser(newUser);

      return newUser;
    } catch (err) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.phone = '';
      state.otp = '';
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.phone = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.loading = false;
        if (action.payload.isRegistered && action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
