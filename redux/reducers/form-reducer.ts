import {dadataAPI, deliveryAPI, feedbackAPI, orderAPI} from "../../src/API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./index";
import {setCaptchaError, SetCaptchaErrorType } from "./errors-reducer";

const GET_CORRECT_ADDRESS = "GET_CORRECT_ADDRESS";
const CLEAR_ADDRESSES = "CLEAR_ADDRESSES";
const GET_CAPTCHA = "GET_CAPTCHA";
const CHANGE_PRICE = "CHANGE_PRICE";
const SET_ID_ACTIVE_ADDRESS = "SET_ID_ACTIVE_ADDRESS";
const SET_MAP_ACTIVE = "SET_MAP_ACTIVE";
const SET_ADDRESS_FROM_MAP = "SET_ADDRESS_FROM_MAP";
const SET_ADDRESS_FROM_MAIN_PAGE = "SET_ADDRESS_FROM_MAIN_PAGE";
const SET_LAST_DATA = "SET_LAST_DATA";

type AddressesFromMainPageType = {
    addressDispatch: string | null,
    addressDelivery: string | null,
}

export type LastAddressesType = Array<{
    addressDispatch: null | string
    addressDelivery: null | string
}>

export type LastContactsType = Array<{
    contactDispatch: {
        name: string
        phone: string
    } | null,
    contactDelivery: {
        name: string
        phone: string
    } | null,
}>

const initialState = {
    address: null as null | string[],
    nameInputActive: null as string | null,
    captchaSrc: null as string | null,
    captchaKey: null as string | null,
    price: null as string | null,
    idAddressActive: null as number | null,
    activeMap: null as "delivery" | "dispatch" | null,
    addressFromMap: null as {address: string, direction: "delivery" | "dispatch"} | null,
    addressesFromMainPage: {
        addressDispatch: null,
        addressDelivery: null,
    } as AddressesFromMainPageType,
    lastAddresses: null as LastAddressesType | null,
    lastContacts: null as LastContactsType | null,
}

type InitialStateType = typeof initialState

const formReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case GET_CORRECT_ADDRESS:
            return {
                ...state,
                address: action.address,
                nameInputActive: action.nameInput,
            }
        case CLEAR_ADDRESSES:
            return {
                ...state,
                address: null,
                nameInputActive: null,
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captchaSrc: action.captchaSrc,
                captchaKey: action.keyCaptcha,
            }
        case CHANGE_PRICE:
            return {
                ...state,
                price: action.price,
            }
        case SET_ID_ACTIVE_ADDRESS:
            return {
                ...state,
                idAddressActive: action.id,
            }
        case SET_MAP_ACTIVE:
            return {
                ...state,
                activeMap: action.direction,
            }
        case SET_ADDRESS_FROM_MAP:
            return {
                ...state,
                addressFromMap: action.data,
            }
        case SET_ADDRESS_FROM_MAIN_PAGE:
            return {
                ...state,
                addressesFromMainPage: {
                    addressDispatch: action.addressDispatch,
                    addressDelivery: action.addressDelivery,
                }
            }
        case SET_LAST_DATA:
            return {
                ...state,
                lastAddresses: action.lastAddresses,
                lastContacts: action.lastContacts,
            }
        default:
            return state
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | OtherActionTypes>

type ActionTypes = GetCorrectAddressActionType | ClearAdressesActionType | GetCaptchaActionType | ChangePriceActionType | SetIdActiveAddressActionType
    | SetMapActiveActionType | SetAddressFromMapActionType | SetAddressFromMainPageActionType | SetLastDataActionType

type OtherActionTypes = SetCaptchaErrorType

type GetCorrectAddressActionType = {
    type: typeof GET_CORRECT_ADDRESS
    address: string[]
    nameInput: string
}

export const getCorrectAddressAction = (address, nameInput): GetCorrectAddressActionType => ({type: GET_CORRECT_ADDRESS, address, nameInput});

type ClearAdressesActionType = {
    type: typeof CLEAR_ADDRESSES
}

export const clearAdressesAction = (): ClearAdressesActionType => ({type: CLEAR_ADDRESSES});

type GetCaptchaActionType = {
    type: typeof GET_CAPTCHA
    captchaSrc: string
    keyCaptcha: string
}

export const getCaptchaAction = (captchaSrc, keyCaptcha): GetCaptchaActionType => ({type: GET_CAPTCHA, captchaSrc, keyCaptcha});

type ChangePriceActionType = {
    type: typeof CHANGE_PRICE
    price: string
}

export const changePriceAction = (price): ChangePriceActionType => ({type: CHANGE_PRICE, price});

type SetIdActiveAddressActionType = {
    type: typeof SET_ID_ACTIVE_ADDRESS
    id: number
}

export const setIdActiveAddressAction = (id): SetIdActiveAddressActionType => ({type: SET_ID_ACTIVE_ADDRESS, id});

type SetMapActiveActionType = {
    type: typeof SET_MAP_ACTIVE
    direction: "dispatch" | "delivery"
}

export const setMapActiveAction = (direction): SetMapActiveActionType => ({type: SET_MAP_ACTIVE, direction});

type SetAddressFromMapActionType = {
    type: typeof SET_ADDRESS_FROM_MAP
    data: {
        address: string
        direction: "dispatch" | "delivery"
    } | null
}

export const setAddressFromMapAction = (data): SetAddressFromMapActionType => ({type: SET_ADDRESS_FROM_MAP, data});

type SetAddressFromMainPageActionType = {
    type: typeof SET_ADDRESS_FROM_MAIN_PAGE
    addressDispatch: string | null
    addressDelivery: string | null
}

export const setAddressFromMainPageAction = (addressDispatch: string | null, addressDelivery: string | null): SetAddressFromMainPageActionType => ({type: SET_ADDRESS_FROM_MAIN_PAGE, addressDispatch, addressDelivery});

type SetLastDataActionType = {
    type: typeof SET_LAST_DATA
    lastAddresses: LastAddressesType
    lastContacts: LastContactsType
}

export const setLastDataAction = (lastAddresses: LastAddressesType, lastContacts: LastContactsType): SetLastDataActionType => ({type: SET_LAST_DATA, lastAddresses, lastContacts});

export const getCorrectAddress = (address: string, inputName: string): ThunkType => {
    return async (dispatch) => {
        const response = await dadataAPI.getAdrress(address);
        console.log("dadata", response);
        if(response.success) {
            const resultOfAddress = response.data.suggestions.map((data) => data.value);
            dispatch(getCorrectAddressAction(resultOfAddress, inputName));
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        const response = await feedbackAPI.getCaptcha();
        console.log(response);
        if(response) {
            await dispatch(getCaptchaAction(response.data.img, response.data.key));
        }
    }
}

export type FeedbackFormType = {
    name: string
    phone: string
    title: string
    message: string
    captcha: string
    key: string
}

export const sendMessage = (data: FeedbackFormType): ThunkType => {
    return async (dispatch) => {
        const response = await feedbackAPI.sendMessage(data);
        if(!response.success) {
            if(response.error.captcha.length > 0) {
                await dispatch(setCaptchaError(response.error.captcha[0]));
            }
        }
        await dispatch(getCaptcha());
    }
}

export type DataOfFormDelivery = {
    id: number | null
    dispatchData: {
        dispatchNames: Array<string>,
        0: Array<string>
    }
    deliveryData: {
        deliveryNames: Array<string>,
        0: Array<string>
    }
    address_delivery: string
    address_dispatch: string
    name_cargo: string
    cargo_type: string
    date_dispatch: string
    date_delivery: string
    payment: string
    val: string
    size_cancel: "false" | "true"
    size_exact: "false" | "true"
    weight: string
    type_height: string
    type_length: string
    type_width: string
}

export const sendDataDeliveryToServer = (data: DataOfFormDelivery):ThunkType => {
    return async (dispatch) => {
        const response = await deliveryAPI.sendDataDelivery(data);
        if(response.success) {

        }
        console.log("dostavista create", response);
    }
}

type DataPrice = {
    address_delivery: string
    address_dispatch: string
    name_cargo: string
    cargo_type: string
    val: string
    weight: string
}

export const getPrice = (data: { address_dispatch: any; val: any; weight: any; address_delivery: any }) => {
    return async (dispatch) => {
        const response = await deliveryAPI.getPrice(data);
        if(response.success) {
            dispatch(changePriceAction(response.data.order["payment_amount"]));
        }
        console.log("price", response);
    }
}

export const getAddressFromCoordinates = (data: string[], activeMap: "dispatch" | "delivery") => {
    return async (dispatch) => {
        const response = await dadataAPI.getAddressFromCoordinates(data);
        console.log(response);
        if(response.success) {
            const address = response.data.suggestions[0].value;
            dispatch(setAddressFromMapAction({address, direction: activeMap}));
        }
    }
}

export const getLastDataForForm = (): ThunkType => {
    return async (dispatch) => {
        const response = await orderAPI.getLastData();
        if(response.success) {
            dispatch(setLastDataAction(response.data.addresses, response.data.contacts));
        }
    }
}

export default formReducer;