import {lkAPI, userAPI} from "../../src/API/API";
import {getAuth} from "./initialize-reducer";

const SET_IS_AJAX = "SET_IS_AJAX";

const initialState = {
    isAjax: false as boolean
}

type InitialStateType = typeof initialState

const lkReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_IS_AJAX:
            return {
                ...state,
                isAjax: action.status,
            }
        default:
            return state;
    }
}

type ActionTypes = SetIsAjaxActionType

export type SetIsAjaxActionType = {
    type: typeof SET_IS_AJAX
    status: boolean
}

export const setIsAjaxAction = (status): SetIsAjaxActionType => ({type: SET_IS_AJAX, status});

type DataOfUserType = {
    address: string
    inn: string
    name: string
    name_organization: string
    ogrn: string
    password: string
    password_double: string
    phone: string
}

export const changeDataOfUser = (data: DataOfUserType) => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await lkAPI.changeDataOfUser(data);
        console.log(response);
        if(response.success) {
            await dispatch(getAuth());
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const logOut = () => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await userAPI.logOut();
        if(response.success) {
            dispatch(getAuth());
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export default lkReducer;