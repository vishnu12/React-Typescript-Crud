import { ThunkAction } from 'redux-thunk'
import {
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCESS,
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS
} from '../constants/usertypes'

import {
        GetUserFail,
        GetUserRequset,
        GetUserSuccess, 
        UserState,
        AddUserFail,
        AddUserRequest,
        AddUserSuccess,
        User,
        DeleteUserFail,
        DeleteUserRequest,
        DeleteUserSuccess
    } from '../reducers/userReducer'
import { RootState } from '../store'

export const getUser=():ThunkAction<void,RootState,undefined,
GetUserFail|GetUserRequset|GetUserSuccess>=>async(dispatch)=>{

    try {
        dispatch({type:GET_USER_REQUEST})
        const data:UserState['data']=await(await fetch('http://localhost:5000/data')).json()
       
        dispatch({
            type:GET_USER_SUCESS,
            payload:{
                data
            }
        })
    } catch (error) {
        dispatch({type:GET_USER_FAIL})
    }
}

export const addUser=(data:User):ThunkAction<void,RootState,undefined,
AddUserFail|AddUserRequest|AddUserSuccess>=>async (dispatch)=>{
      try {
          dispatch({type:ADD_USER_REQUEST})
          await fetch('http://localhost:5000/data',{
              method:'POST',
              headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
          })
          
        dispatch({type:ADD_USER_SUCCESS})
          
      } catch (error) {
          dispatch({type:ADD_USER_FAIL})
      }
}


export const deleteUser=(id:User["id"]):ThunkAction<void,
RootState,undefined,DeleteUserFail|DeleteUserRequest|DeleteUserSuccess>=>async(dispatch)=>{
        try {
            dispatch({type:DELETE_USER_REQUEST})

            await fetch('http://localhost:5000/data/'+id,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
               
            })

            dispatch({type:DELETE_USER_SUCCESS})
        } catch (error) {
            dispatch({type:DELETE_USER_FAIL})
        }
}