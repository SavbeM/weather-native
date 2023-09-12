import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";



export type AppThunkDispatch = ThunkDispatch<RootState, unknown, any>
