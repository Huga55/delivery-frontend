import {rememberAPI} from "../../src/API/API";
import {setIsAjaxAction} from "./lk-reducer";

const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_IS_SEND_MESSAGE = "SET_IS_SEND_MESSAGE";
const SET_IS_PASSWORD_SUCCESS = "SET_IS_PASSWORD_SUCCESS";

const initialState = {
    isErrorEmail: null as string | null,
    isSendMessage: false,
    email: null as string | null,
    isPasswordSuccess: false,
}

type InitialStateType = typeof initialState

const rememberReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_IS_SEND_MESSAGE:
            return {
                ...state,
                isSendMessage: action.value,
                email: action.email,
            }
        case SET_EMAIL_ERROR:
            return {
                ...state,
                isErrorEmail: action.message,
            }
        case SET_IS_PASSWORD_SUCCESS:
            return {
                ...state,
                isPasswordSuccess: action.value,
            }
        default:
            return state
    }
}

type ActionTypes = SetEmailErrorActionType | SetIsSendMessageActonType | SetIsPasswordSuccessActionType

type SetEmailErrorActionType = {
    type: typeof SET_EMAIL_ERROR
    message: string | null
}

export const setEmailErrorAction = (message): SetEmailErrorActionType => ({type: SET_EMAIL_ERROR, message});

type SetIsSendMessageActonType = {
    type: typeof SET_IS_SEND_MESSAGE
    value: boolean
    email: string | null
}

export const setIsSendMessageAction = (value, email): SetIsSendMessageActonType => ({type: SET_IS_SEND_MESSAGE, value, email});

type SetIsPasswordSuccessActionType = {
    type: typeof SET_IS_PASSWORD_SUCCESS
    value: boolean
}

export const setIsPasswordSuccessAction = (value): SetIsPasswordSuccessActionType => ({type: SET_IS_PASSWORD_SUCCESS, value});

export const sendEmailRemember = (email: string) => {
    return async (dispatch) => {
        const URI = window.location.origin;
        await dispatch(setIsAjaxAction(true));
        const response = await rememberAPI.sendEmail(email, URI);
        if(response.success) {
            await dispatch(setIsSendMessageAction(true, response.data));
        }else {
            await dispatch(setEmailErrorAction(response.data));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const sendRememberToken = (token: string | string[]) => {
    return async (dispatch) => {
        const response = await rememberAPI.getPassword(token);
        console.log(response);
        if(response.success) {
            dispatch(setIsPasswordSuccessAction(true));
        }else {
            //window.location.replace(window.location.origin);
        }
    }
}

export default rememberReducer;