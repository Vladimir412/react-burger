import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, AppThunk, RootState, TApplicationActions } from './types/types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

export const useDispatch = () => dispatchHook<ThunkDispatch<RootState, never, TApplicationActions>>(); 
