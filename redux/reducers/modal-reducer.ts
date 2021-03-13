const SET_IS_REGISTER = "SET_IS_REGISTER";

const initialState = {
    isRegister: false as boolean,
}

type InitialStateType = typeof initialState

const modalReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_IS_REGISTER:
            return {
                ...state,
                isRegister: action.value,
            }
        default:
            return state
    }
}

type ActionTypes = SetIsRegisterType

export type SetIsRegisterType = {
    type: typeof SET_IS_REGISTER
    value: boolean
}

export const setIsRegisterAction = (value): SetIsRegisterType => ({type: SET_IS_REGISTER, value});

export default modalReducer;