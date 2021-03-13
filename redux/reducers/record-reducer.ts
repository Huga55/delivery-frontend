import {DocsType} from "./actualOrder-reducer";
import {setIsAjaxAction} from "./lk-reducer";
import {orderAPI} from "../../src/API/API";

const SET_COUNT_NEED_RECORDS = "SET_COUNT_NEED_RECORDS";
const SET_CURRENT_PAGE_RECORD = "SET_CURRENT_PAGE_RECORD";
const SET_RECORDS = "SET_RECORDS";
const CHANGE_TYPE_FILTER = "CHANGE_TYPE_FILTER";


const initialState = {
    docs: null as null | Array<DocsType>,
    countRecords: null as number | null,
    currentPage: 1,
    countNeed: 10,
    filters: {
        dateStart: null as string | null,
        dateFinish: null as string | null,
        byDocType: null as any | null,
        byType: "doc" as "doc" | "record",
    }
}

type InitialStateType = typeof initialState

const recordReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case SET_COUNT_NEED_RECORDS:
            return {
                ...state,
                countNeed: action.count,
            }
        case SET_CURRENT_PAGE_RECORD:
            return {
                ...state,
                currentPage: action.page,
            }
        case SET_RECORDS:
            return {
                ...state,
                docs: action.records,
            }
        case CHANGE_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    byType: action.typeFilter,
                },
            }
        default:
            return state
    }
}

type ActionTypes = SetCountNeedRecordsActionType | SetCurrentPageRecordActionType | SetReordsActionType | ChangeTypeFilterActionType

type SetCountNeedRecordsActionType = {
    type: typeof SET_COUNT_NEED_RECORDS
    count: number
}

export const setCountNeedRecordsAction = (count): SetCountNeedRecordsActionType => ({type: SET_COUNT_NEED_RECORDS, count});

type SetCurrentPageRecordActionType = {
    type: typeof SET_CURRENT_PAGE_RECORD
    page: number
}

export const setCurrentPageRecordAction = (page): SetCurrentPageRecordActionType => ({type: SET_CURRENT_PAGE_RECORD, page});

type SetReordsActionType = {
    type: typeof SET_RECORDS
    records: Array<DocsType>
}

export const setRecordsAction = (records): SetReordsActionType => ({type: SET_RECORDS, records});

type ChangeTypeFilterActionType = {
    type: typeof CHANGE_TYPE_FILTER
    typeFilter: "doc" | "record"
}

export const changeTypeFilterAction = (typeFilter): ChangeTypeFilterActionType => ({type: CHANGE_TYPE_FILTER, typeFilter});

type DataRecordsType = {
    countNeed: number
    currentPage: number
    dateStart: string
    dateFinish: string
    type: string
    doc_type: string
}

export const getAllRecords = (data: DataRecordsType) => {
    return async dispatch => {
        await dispatch(setIsAjaxAction(true));
        const response  = await orderAPI.getAllRecords(data);
        console.log(response);
        if(response.success) {
            dispatch(setRecordsAction(response.data));
        }
        await dispatch(setIsAjaxAction(false));
    }
}

export default recordReducer;