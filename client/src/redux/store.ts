
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';


import authReducer from './../modules/auth/slice/authSlice';
import fraudShieldReducer from './../modules/fraud-shield/slice/fraudShieldSlice';
import aiAssistantReducer from './../modules/ai-assistant/slice/aiAssistantSlice';
import homeReducer from './../modules/home/slice/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fraudShield: fraudShieldReducer,
    aiAssistant: aiAssistantReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
