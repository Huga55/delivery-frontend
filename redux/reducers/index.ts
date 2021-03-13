import {combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import initializeReducer from "./initialize-reducer";
import errorsReducer from "./errors-reducer";
import modalReducer from "./modal-reducer";
import formReducer from "./form-reducer";
import bookReducer from "./book-reducer";
import lkReducer from "./lk-reducer";
import actualOrderReducer from "./actualOrder-reducer";
import recordReducer from "./record-reducer";
import rememberReducer from "./remember-reducer";


const rootReducers = combineReducers({
    user: profileReducer,
    initialize: initializeReducer,
    errors: errorsReducer,
    modal: modalReducer,
    form: formReducer,
    book: bookReducer,
    lk: lkReducer,
    actualOrder: actualOrderReducer,
    record: recordReducer,
    remember: rememberReducer,
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


export default rootReducers;