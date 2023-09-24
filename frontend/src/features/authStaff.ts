import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterProps, AuthDataStaff } from '../app/types';
import MainApi from '../utils/Api';

interface AuthStatePatient {
  error: any;
  isLoggin: boolean;
  isRegistered: boolean;
  loading: boolean;
  staffData: any;
}

const initialState: AuthStatePatient = {
  error: null,
  isLoggin: false,
  loading: false,
  isRegistered: false,
  staffData: null,
};

export const fetchAuthStaff = createAsyncThunk('auth/staff', async (data: AuthDataStaff) => {
    return MainApi.loginStaff(data);
  });

export const fetchRegisterStaff = createAsyncThunk('register/staff', async (data: RegisterProps) => {
  return MainApi.registerStaff(data);
});

export const authStaffSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterStaff.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchRegisterStaff.fulfilled, (state, action) => {
        state.staffData = action.payload;
        state.isLoggin = true;
        state.loading = false;
      });
      builder.addCase(fetchRegisterStaff.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const authStaffReducer = authStaffSlice.reducer;

export default authStaffReducer;
