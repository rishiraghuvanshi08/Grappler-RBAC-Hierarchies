import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    users: [],
    isLoading: false,
    error: null,
}
export const getUsersData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingDataRequest());
          const response = await axios.get('http://localhost:8080/users/');
          const data = response.data;
          dispatch(fetchingDataSuccess(data));
          return data;
        } catch (error) {
          dispatch(fetchingDataFailure(error));
        }
    }
}
export const deleteUserData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8080/users/${index}`);
            dispatch(deletingTheUser(index))
            console.log('Resource deleted successfully.', response.data);
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const addUserData = (user) =>{
    console.log( user)
    return async(dispatch) =>{
        try {
            const response=await axios.post('http://localhost:8080/users/', user);
            console.log("respinse",response.data);
            dispatch(addingUser(response.data.data));
          } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 409) {
                  alert(error.response.data.message);
                } else if (status === 500) {
                  alert(error.response.data.message);
                } else{
                  alert(error.response.data.message);
                }
            }
            console.error('Error storing data:', error);
          }
    }
}
export const updateUserData = (id, name, email, designation) =>{
    return async(dispatch) =>{
        try {
            let details = { name, email, designation };
            const response = await axios.put(`http://localhost:8080/users/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingUser({ id: id, details: details }));
          } catch (error) {
            if(error.response)
            {
                alert(error.response.data.message);
            }
            console.log('Error updating resource: ' + error.message);
          }
    }
}

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        fetchingDataRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        fetchingDataSuccess : (state, action) =>{
            // console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                users : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingDataFailure : (state, action) =>{
            return {
                ...state,
                users: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingUser : (state, action) =>{
            console.log("Inside Reducer", action)
            // state.users = action.payload;
            let users = [...state.users];
            users.push(action.payload);
            state.users = users;
        },
        deletingTheUser : (state, action) =>{
            const updatedItems = state.users.filter((item, index) => item.id !== action.payload);
            state.users = updatedItems;
            // console.log("hello", updatedItems);
            // return {
            //     ...state,
            //     users: updatedItems,
            // }
        },
        updatingUser : (state, action) =>{
            console.log("hello", action.payload);
            const updatedItems = state.users.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            console.log("hello", updatedItems);
            return {
                ...state,
                users: updatedItems,
            };
        }
    }
})
export const {
    fetchingDataRequest, fetchingDataSuccess, fetchingDataFailure, deletingTheUser, addingUser, updatingUser
} = userSlice.actions;
export default userSlice.reducer;
  