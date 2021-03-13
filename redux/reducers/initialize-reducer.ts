import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./index";
import {userAPI} from "../../src/API/API";
import {getInfoAction, GetInfoActionType} from "./profile-reducer";
import {getAllAddresses} from "./book-reducer";
import {setIsAjaxAction} from "./lk-reducer";
import {getLastDataForForm} from "./form-reducer";

const GET_IS_AUTH = "GET_IS_AUTH";
const SET_IS_INITIALIZE = "SET_IS_INITIALIZE";

const initialState = {
    isAuth: null as boolean | null,
    isInitialize: true,
}

type InitialStateType = typeof initialState;

const initializeReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case GET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case SET_IS_INITIALIZE:
            return {
                ...state,
                isInitialize: action.status,
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>

type OtherActionTypes = GetInfoActionType

type ActionTypes = GetAuthActionType | SetIsInitializeActionType

type GetAuthActionType = {
    type: typeof GET_IS_AUTH
    isAuth: boolean
}

export const getAuthAction = (isAuth: boolean): GetAuthActionType => ({type: GET_IS_AUTH, isAuth});

type SetIsInitializeActionType = {
    type: typeof SET_IS_INITIALIZE
    status: boolean
}

export const setIsInitializeAction = (status): SetIsInitializeActionType => ({type: SET_IS_INITIALIZE, status});

export const getAuth = (): ThunkType => {
    return async (dispatch) => {
        const response = await userAPI.getInitial();
        console.log(response);
        if(response.success) {
            const { name, id, nameOrganization, phone, email, inn, ogrn, isJuristic, address, avatar, ordersCount } = response.data;
            await dispatch(getAuthAction(true));
            await dispatch(getInfoAction(name, id, nameOrganization, phone, email, inn, ogrn, isJuristic, address, avatar, ordersCount));
            await dispatch(getAllAddresses(15, 1));
            await dispatch(getLastDataForForm());
        }else {
            await dispatch(getAuthAction(false));
        }
        dispatch(setIsInitializeAction(false));
    }
}

export default initializeReducer;