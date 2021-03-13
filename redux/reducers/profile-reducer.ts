import {instance, userAPI} from "../../src/API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./index";
import {
    setEmailError,
    SetEmailErrorType,
    setPasswordError,
    SetPasswordErrorType,
    setPhoneError,
    SetPhoneErrorType
} from "./errors-reducer";
import {setIsRegisterAction, SetIsRegisterType} from "./modal-reducer";
import {getAuth} from "./initialize-reducer";

const GET_INFO = "GET_INFO";
const SET_NAME_OF_DADATA = "SET_NAME_OF_DADATA";
const SET_AVATAR_PATH = "SET_AVATAR_PATH";

const initialState = {
    name: null as string | null,
    nameOrganization: null as string | null,
    id: null as number | null,
    phone: null as  string | null,
    email: null as string | null,
    inn: null as string | null,
    ogrn: null as string | null,
    isJuristic: null as boolean | null,
    address: null as string | null,
    nameOfDadata: null as string | null,
    avatar: null as string | null,
    ordersCount: null as number | null,
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case GET_INFO:
            return {
                ...state,
                ...action.data,
            }
        case SET_NAME_OF_DADATA:
            return {
                ...state,
                nameOfDadata: action.name,
            }
        case SET_AVATAR_PATH:
            return {
                ...state,
                avatar: action.path,
            }
        default:
            return state
    }
}

type OtherActionTypes = SetEmailErrorType | SetPhoneErrorType | SetPasswordErrorType | SetIsRegisterType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>

type ActionTypes = GetInfoActionType | SetNameOfDadataActionType | SetAvatarPathAction




export type GetInfoActionType = {
    type: typeof GET_INFO
    data: {
        name: string
        id: number
        nameOrganization: string | null
        phone: string
        email: string
        inn: string | null
        ogrn: string | null
        isJuristic: boolean
        address: string | null
        avatar: string | null
        ordersCount: number | null
    }
}

export const getInfoAction = (name: string, id: number, nameOrganization: string | null, phone: string, email: string, inn: string | null, ogrn: string | null, isJuristic: boolean, address: string | null, avatar: string | null, ordersCount: number | null): GetInfoActionType =>
    ({type: GET_INFO, data:{name, id, nameOrganization, phone, email, inn, ogrn, isJuristic, address, avatar, ordersCount}});

type SetNameOfDadataActionType = {
    type: typeof SET_NAME_OF_DADATA
    name: string
}

export const setNameOfDadataAction = (name): SetNameOfDadataActionType => ({type: SET_NAME_OF_DADATA, name});

type SetAvatarPathAction = {
    type: typeof SET_AVATAR_PATH
    path: string | null
}

export const setAvatarPathAction = (path): SetAvatarPathAction => ({type: SET_AVATAR_PATH, path});

export const registerOfUser = (name: string, password: string, phone: string, email: string, isJuristic: boolean, nameOrganization: string | null = null,  inn: string | null = null, ogrn: string | null = null, address: string | null = null ): ThunkType => {
    return async (dispatch) => {
        const response = await userAPI.registerOfUser(name, password, phone, email, isJuristic, nameOrganization, inn, ogrn, address);
        if(!response.success) {
            if(response.error.email.length > 0) {
                dispatch(setEmailError(response.error.email[0]));
            }
            if(response.error.phone && response.error.phone.length > 0) {
                dispatch(setPhoneError(response.error.phone[0]));
            }
        }else {
            dispatch(setIsRegisterAction(true));
        }
    }
}

export const authOfUser = (email: string, password: string): ThunkType => {
    return async (dispatch) => {
        const response = await userAPI.authOfUser(email, password);
        if(!response.success) {
            if(response.error.password.length > 0) {
                await dispatch(setPasswordError(response.error.password[0]));
            }
        }else {
            //if authorization is true, then set token to local storage and to instance
            window.localStorage.setItem("token", response.token);
            instance.defaults.headers["Authorization"] = response.token;
            await dispatch(getAuth());
        }
    }
}

export const getName = (inn): ThunkType => {
    return async (dispatch) => {
        const response = await userAPI.getName(inn);
        if(response.success && response.data.suggestions.length > 0) {
            dispatch(setNameOfDadataAction(response.data.suggestions[0].data.name["short_with_opf"]));
        }
    }
}

export const sendAvatar = (img) => {
    return async (dispatch) => {
        const response = await userAPI.sendAvatar(img);
        console.log(response);
        if(response.success) {
            dispatch(setAvatarPathAction(response.data));
        }
    }
}

export default profileReducer;