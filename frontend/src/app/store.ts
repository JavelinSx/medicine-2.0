import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authPatientSlice from '../features/authPatient';
import  authStaffSlice  from '../features/authStaff';
import  getPatientSlice  from '../features/getPatient';
import toolTipReducer from '../features/handlers/toolTip';
export const store = configureStore({
  reducer: {
    authPatientReducer: authPatientSlice,
    authStaffReducer: authStaffSlice,
    getPatientReducer: getPatientSlice,
    toolTipReducer: toolTipReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
