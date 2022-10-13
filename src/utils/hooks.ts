import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
  } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, AppThunk, RootState, TApplicationActions } from './types/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 

export const useAppDispatch = () => useDispatch<AppDispatch>()
