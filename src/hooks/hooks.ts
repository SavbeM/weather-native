import {AppDispatch, RootState} from "../store/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";



type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc =  useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useThunkDispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>()
