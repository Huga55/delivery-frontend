
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR";
const SET_PHONE_ERROR = "SET_PHONE_ERROR";
const SET_INN_ERROR = "SET_INN_ERROR";
const SET_OGRN_ERROR = "SET_OGRN_ERROR";
const SET_CAPTCHA_ERROR = "SET_CAPTCHA_ERROR";
const CLEAR_ALL = "CLEAR_ALL";

const initialState = {
    emailTextError: null as string | null,
    phoneTextError: null as string | null,
    passwordTextError: null as string | null,
    innTextError: null as string | null,
    ogrnTextError: null as string | null,
    captchaTextError: null as string | null,
}

type InitialStateType = typeof initialState

const errorsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_EMAIL_ERROR:
            return {
                ...state,
                emailTextError: action.text
            }
        case SET_PASSWORD_ERROR:
            return {
                ...state,
                passwordTextError: action.text
            }
        case SET_PHONE_ERROR:
            return {
                ...state,
                phoneTextError: action.text
            }
        case SET_INN_ERROR:
            return {
                ...state,
                innTextError: action.text
            }
        case SET_OGRN_ERROR:
            return {
                ...state,
                ogrnTextError: action.text
            }
        case SET_CAPTCHA_ERROR:
            return {
                ...state,
                captchaTextError: action.text
            }
        case CLEAR_ALL:
            return {
                ...state,
                emailTextError: null,
                passwordTextError: null,
                phoneTextError: null,
                innTextError: null,
                ogrnTextError: null,
                captchaTextError: null,
            }
        default:
            return state
    }
}

type ActionTypes = SetEmailErrorType | SetPasswordErrorType | ClearAllType | SetPhoneErrorType | SetInnErrorType | SetOgrnErrorType | SetCaptchaErrorType

export type SetEmailErrorType = {
    type: typeof SET_EMAIL_ERROR
    text: string
}

export const setEmailError = (text: string): SetEmailErrorType => ({type: SET_EMAIL_ERROR, text});

export type SetPasswordErrorType = {
    type: typeof SET_PASSWORD_ERROR
    text: string
}

export const setPasswordError = (text: string): SetPasswordErrorType => ({type: SET_PASSWORD_ERROR, text});

export type SetPhoneErrorType = {
    type: typeof SET_PHONE_ERROR
    text: string
}

export const setPhoneError = (text: string): SetPhoneErrorType => ({type: SET_PHONE_ERROR, text});

export type SetInnErrorType = {
    type: typeof SET_INN_ERROR
    text: string
}

export const setInnError = (text: string): SetInnErrorType => ({type: SET_INN_ERROR, text});

export type SetOgrnErrorType = {
    type: typeof SET_OGRN_ERROR
    text: string
}

export const setOgrnError = (text: string): SetOgrnErrorType => ({type: SET_OGRN_ERROR, text});

export type SetCaptchaErrorType = {
    type: typeof SET_CAPTCHA_ERROR
    text: string
}

export const setCaptchaError = (text: string): SetCaptchaErrorType => ({type: SET_CAPTCHA_ERROR, text});

type ClearAllType = {
    type: typeof CLEAR_ALL
}

export const clearAll = () => ({type: CLEAR_ALL});

export default errorsReducer;


