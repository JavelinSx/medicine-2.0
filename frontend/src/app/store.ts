import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authPatientSlice from '../features/authPatient';
export const store = configureStore({
  reducer: {
    authPatient: authPatientSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
