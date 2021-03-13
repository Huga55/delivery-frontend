import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./index";
import {lkAPI} from "../../src/API/API";
import {setIsAjaxAction, SetIsAjaxActionType} from "./lk-reducer";

const GET_ADDRESSES = "GET_ADDRESSES";
const SET_COUNT_NEED = "SET_COUNT_NEED";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ADDRESS_FOR_CHANGE = "SET_ADDRESS_FOR_CHANGE";

export type AddressType = {
    id_organization: number
    id_address: number
    name_organization: string
    address: string
    name: string
    phone: string
    city: string
    street: string
    home: string
    corpus: string
    apartment: string
    structure: string
    phone_mobile: string
    phone_work: string
    phone_more: string
    position: string
    type_person: string
    house_type: string
    inn: string
}

const initialState = {
    addresses: null as null | Array<AddressType>,
    countAddresses: null as null | number,
    currentPage: 1 as number,
    countNeed: 15 as number,
    idAddressForChange: 0 as number,
    filters: {
        byName: null as "up" | "down" | null,
        byNew: null as "new" | "old" | null,
    }
}

type InitialStateType = typeof initialState

const bookReducer = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch (action.type) {
        case GET_ADDRESSES:
            return {
                ...state,
                addresses: action.addresses,
                countAddresses: action.countAddresses,
            }
        case SET_COUNT_NEED:
            return {
                ...state,
                countNeed: +action.count,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: +action.currentPage,
            }
        case SET_ADDRESS_FOR_CHANGE:
            return {
                ...state,
                idAddressForChange: +action.idAddress,
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>

type ActionTypes = GetAddressesActionType | SetCountNeedActionType | SetCurrentPageActionType |SetAddressForChangeActionType
type OtherActionTypes = SetIsAjaxActionType

export type DataNewAddressType = {
    id_organization?: string
    id_address?: string
    type_person: string,
    name: string | null,
    position: string | null,
    name_organization: string | null,
    phone_work: string | null,
    phone_mobile: string | null,
    phone_more: string | null,
    addresses: Array<{
        city: string
        street: string
        house: string | null
        corpus: string | null
        structure: string | null
        house_type: string
        room: string | null
    }>
}

type GetAddressesActionType = {
    type: typeof GET_ADDRESSES
    addresses: Array<AddressType>
    countAddresses: number
}

export const getAddressesAction = (addresses, countAddresses): GetAddressesActionType => ({type: GET_ADDRESSES, addresses, countAddresses});

type SetCountNeedActionType = {
    type: typeof SET_COUNT_NEED
    count: string
}

export const setCountNeedAction= (count): SetCountNeedActionType => ({type: SET_COUNT_NEED, count});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: string
}

export const setCurrentPageAction = (currentPage): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetAddressForChangeActionType = {
    type: typeof SET_ADDRESS_FOR_CHANGE
    idAddress: string
}

export const setAddressForChangeAction = (idAddress): SetAddressForChangeActionType => ({type: SET_ADDRESS_FOR_CHANGE, idAddress});

export const createNewAddress = (data: DataNewAddressType): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await lkAPI.sendNewAddress(data);
        if(!response.status) {
            console.log("createNewAddress - false");
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const getAllAddresses = (countNeed: number, currentPage: number, nameFilter = null, newFilter = null): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await lkAPI.getAddresses(countNeed, currentPage, nameFilter, newFilter);
        console.log(response);
        if(response.success) {
            dispatch(getAddressesAction(response.data, response.count));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const changeAddress = (data: DataNewAddressType): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await lkAPI.changeAddress(data);
        console.log(response);
        await dispatch(setIsAjaxAction(false));
    }
}

export const deleteAddress = (data: { id_organization: number; id_address: number }): ThunkType => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await lkAPI.deleteAddress(data);
        console.log(response);
        await dispatch(setIsAjaxAction(false));
    }
}

export default bookReducer;