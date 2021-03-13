import {orderAPI} from "../../src/API/API";
import {setIsAjaxAction} from "./lk-reducer";

const SET_CURRENT_PAGE_ORDER = "SET_CURRENT_PAGE_ORDER";
const SET_ORDERS_FROM_SERVER = "SET_ORDERS_FROM_SERVER";
const SET_COUNT_NEED_ORDER = "SET_COUNT_NEED_ORDER";
const SET_ID_CURRENT_ORDER = "SET_ID_CURRENT_ORDER";
const SET_DOCS_FROM_SERVER = "SET_DOCS_FROM_SERVER";
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const SET_USUAL_FILTERS = "SET_USUAL_FILTERS";

export type OrdersType = {
    id: number
    idDostavista: number
    dateCreate: string
    nameCargo: string
    type: string
    nameOrganization: string
    nameDelivery: string
    trackNumber: number
    price: string
    status: string
}

export type DocsType = {
    id: number
    order_id: number
    dostavista_id: number
    path: string
    name: string
    type_doc: string
    type: "doc" | "record"
    created_at: string
}

const initialState = {
    orders: null as null | Array<OrdersType>,
    countOrders: null as number | null,
    currentPage: 1,
    countNeed: 5,
    idCurrentOrder: null as number | null,
    docsOfOrder: null as Array<DocsType> | null,
    filters: {
        dateStart: null as string | null,
        dateFinish: null as string | null,
        byStatus: null as any | null,
        byPrice: null as "asc" | "desc" | null,
        bySearch: null as string | null,
    }
}

type InitialStateType = typeof initialState

const actualOrderReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_ORDERS_FROM_SERVER:
            return {
                ...state,
                orders: action.orders,
                countOrders: action.count,
            }
        case SET_CURRENT_PAGE_ORDER:
            return {
                ...state,
                currentPage: action.page,
            }
        case SET_COUNT_NEED_ORDER:
            return {
                ...state,
                countNeed: action.count,
            }
        case SET_ID_CURRENT_ORDER:
            return {
                ...state,
                idCurrentOrder: action.id,
            }
        case SET_DOCS_FROM_SERVER:
            return {
                ...state,
                docsOfOrder: action.docs
            }
        case SET_SEARCH_VALUE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    bySearch: action.value,
                }
            }
        case SET_USUAL_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    dateStart: action.usualFilters.dateStart,
                    dateFinish: action.usualFilters.dateFinish,
                    byStatus: action.usualFilters.statusFilter,
                    byPrice: action.usualFilters.priceFilter,
                }
            }
        default:
            return state
    }
}

type ActionTypes = SetCurrentPageOrderActionType | SetOrdersFromServerActionType | SetCountNeedOrderActionType | SetIdCurrentOrderAction |
    SetDocsFromServerActionType | SetSearchValueActionType | SetUsualFiltersActionType

type SetCurrentPageOrderActionType = {
    type: typeof SET_CURRENT_PAGE_ORDER
    page: number
}

export const setCurrentPageOrderAction = (page: number) => ({type: SET_CURRENT_PAGE_ORDER, page});

export type GetOrderDataType = {
    countNeed: number | null
    currentPage: number | null
    dateStart: string | null
    dateFinish: string | null
    statusFilter: string | null
    priceFilter: string | null
    searchFilter: string | null
}

export type SetOrdersFromServerActionType = {
    orders: Array<OrdersType>
    count: number
    type: typeof SET_ORDERS_FROM_SERVER
}

export const setOrdersFromServerAction = (orders, count): SetOrdersFromServerActionType => ({type: SET_ORDERS_FROM_SERVER, orders, count});

export type SetCountNeedOrderActionType = {
    type: typeof SET_COUNT_NEED_ORDER
    count: number
}

export const setCountNeedOrderAction = (count): SetCountNeedOrderActionType => ({type: SET_COUNT_NEED_ORDER, count});

type SetIdCurrentOrderAction = {
    type: typeof SET_ID_CURRENT_ORDER
    id: number
}

export const setIdCurrentOrderAction = (id): SetIdCurrentOrderAction => ({type: SET_ID_CURRENT_ORDER, id});

type SetDocsFromServerActionType = {
    type: typeof SET_DOCS_FROM_SERVER
    docs: Array<DocsType>
}

export const setDocsFromServerAction = (docs): SetDocsFromServerActionType => ({type: SET_DOCS_FROM_SERVER, docs});

type SetSearchValueActionType = {
    type: typeof SET_SEARCH_VALUE
    value: string
}

export const setSearchValueAction = (value): SetSearchValueActionType => ({type: SET_SEARCH_VALUE, value});

type SetUsualFiltersActionType = {
    type: typeof SET_USUAL_FILTERS
    usualFilters: {
        dateFinish: null | string
        dateStart: null | string
        priceFilter: null | "asc" | "desc"
        statusFilter: null | string
    }
}

export const setUsualFiltersAction = (usualFilters): SetUsualFiltersActionType => ({type: SET_USUAL_FILTERS, usualFilters});

export const getAllOrders = (data: GetOrderDataType) => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getAllOrders(data);
        console.log(response);
        if(response.success) {
            await dispatch(setOrdersFromServerAction(response.data, response.count));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const getDocsOfOrder = (id: number) => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.getDocsOfOrder(id);
        console.log(response);
        if(response.success) {
            await dispatch(setDocsFromServerAction(response.data));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export const repeatOrder = (order_id: number) => {
    return async (dispatch) => {
        await dispatch(setIsAjaxAction(true));
        const response = await orderAPI.repeatOrder(order_id);
        console.log("repeat_order", response);
        if(response.success) {

        }
        await dispatch(setIsAjaxAction(false));
    }
}

export default actualOrderReducer;