import { Action } from 'redux'
import {
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCESS,
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS
} from '../constants/usertypes'

export interface User{
    id?:number |undefined,
    name:string,
    role:string
}

export interface UserState{
    data:User[],
    loading:boolean,
    error:boolean,
    success?:false
   
}

export interface GetUserRequset extends Action<typeof GET_USER_REQUEST>{}
export interface GetUserSuccess extends Action<typeof GET_USER_SUCESS>{
    payload:{
        data:UserState['data']
    }
}
export interface GetUserFail extends Action<typeof GET_USER_FAIL>{}

export interface AddUserRequest extends Action<typeof ADD_USER_REQUEST>{}
export interface AddUserSuccess extends Action<typeof ADD_USER_SUCCESS>{}
export interface AddUserFail extends Action<typeof ADD_USER_FAIL>{}

export interface DeleteUserRequest extends Action<typeof DELETE_USER_REQUEST>{}
export interface DeleteUserSuccess extends Action<typeof DELETE_USER_SUCCESS>{}
export interface DeleteUserFail extends Action<typeof DELETE_USER_FAIL>{}


const initialState:UserState={
    data:[],
    loading:false,
    error:false,
    success:false
}

export const getUserReducer=(state:UserState=initialState,
    action:GetUserRequset|GetUserFail|GetUserSuccess)=>{
        switch (action.type) {
            case GET_USER_REQUEST:
                return {
                   ...state,
                    loading:true
                }

            case GET_USER_SUCESS :
                return {
                    ...state,
                    loading:false,
                    data:action.payload.data
                } 
            case GET_USER_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:true
                }
            default:
                return state;
        }
}

export const addUserReducer=(state:UserState=initialState,
    action:AddUserFail|AddUserRequest|AddUserSuccess)=>{
        switch (action.type) {
            case ADD_USER_REQUEST:
                return {
                   ...state,
                    loading:true
                }

            case ADD_USER_SUCCESS :
                return {
                    ...state,
                    loading:false,
                    success:true
                } 
            case ADD_USER_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:true
                }
            default:
                return state;
        }
}


export const deleteUserReducer=(state:UserState=initialState,
    action:DeleteUserFail|DeleteUserRequest|DeleteUserSuccess)=>{
          
        switch (action.type) {
            case DELETE_USER_REQUEST:
                return {
                    ...state,
                    loading:true
                }
               
            case DELETE_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    success:true,
                }

            case DELETE_USER_FAIL:
                return {
                    ...state,
                    error:true
                }    
            default:
                return state
        }
}