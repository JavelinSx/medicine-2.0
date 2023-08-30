import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterPatient, AuthData } from '../app/types';
import MainApi from '../utils/Api';

interface AuthStatePatient {
  error: any;
  isLoggin: boolean;
  isRegistered: boolean;
  loading: boolean;
  patientData: any;
}

const initialState: AuthStatePatient = {
  error: null,
  isLoggin: false,
  loading: false,
  isRegistered: false,
  patientData: null,
};

export const fetchAuthPatient = createAsyncThunk('auth/patient', async (data: AuthData) => {
  return MainApi.loginPatient(data);
});

export const fetchRegisterPatient = createAsyncThunk('register/patient', async (data: any) => {
  return MainApi.registerPatient(data);
});

export const authPatientSlice = createSlice({
  name: 'authPatient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthPatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthPatient.fulfilled, (state, action) => {
      state.patientData = action.payload;
      state.isLoggin = true;
      state.loading = false;
    });
    builder.addCase(fetchAuthPatient.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRegisterPatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRegisterPatient.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.loading = false;
    });
    builder.addCase(fetchRegisterPatient.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authPatientSlice.reducer;
