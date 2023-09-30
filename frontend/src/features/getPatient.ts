import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterPatient, AuthData} from '../app/types';
import { RootState } from '../app/store';
import { createSelector } from '@reduxjs/toolkit';
import MainApi from '../utils/Api';

interface GetStatePatient {
  error: any;
  loading: boolean;
  patientData: RegisterPatient;
}

const initialState: GetStatePatient = {
  error: null,
  loading: false,
  patientData: {
    surName: '',
    name: '',
    middleName: '',
    role: '',
    login: '',
    password: '',
    gender: '',
    dateBirthday: '',
    files: []
  },
};

export const fetchGetPatient = createAsyncThunk('get/patient', async (id: string) => {
  return MainApi.getPatient(id);
});



export const getPatientSlice = createSlice({
  name: 'getPatient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetPatient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchGetPatient.fulfilled, (state, action) => {
      state.patientData = action.payload;
      state.loading = false;
      console.log(action.payload)
    });
    builder.addCase(fetchGetPatient.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const getPatientReducer = getPatientSlice.reducer;

export default getPatientReducer;

const selectPatientData = (state: RootState) => state.getPatientReducer.patientData;

export { selectPatientData };
