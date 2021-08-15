import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {TypedUseSelectorHook,useSelector as useStoreSelector} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {addUserReducer, getUserReducer,deleteUserReducer} from './reducers/userReducer'


const rootReducer=combineReducers({
    getUsers:getUserReducer,
    addUser:addUserReducer,
    deleteUser:deleteUserReducer
})

export type RootState=ReturnType<typeof rootReducer>

const initialState:Omit<RootState,'addUser'|'deleteUser'>={
    getUsers:{
        data:[],
        loading:false,
        error:false
    }
}

const middleware=[thunk]

const store=createStore(rootReducer,initialState,composeWithDevTools(
    applyMiddleware(...middleware)
))

export const useSelector:TypedUseSelectorHook<RootState>=useStoreSelector

export default store