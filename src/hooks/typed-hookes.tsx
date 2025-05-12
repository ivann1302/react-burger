import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './../services/store';
import { RootState } from '@services/reducers/root-reducer';

export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
