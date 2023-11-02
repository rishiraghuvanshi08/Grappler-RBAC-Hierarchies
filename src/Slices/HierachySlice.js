import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    hierarchy: [],
    isLoadingHeirarchy: false,
    hierarchyError: null,
}
export const getHeirarchyData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get('http://localhost:8080/hierarchy/reporting');
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}
export const getHeirarchyIdData = (index) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get(`http://localhost:8043/hierarchy/reporting/${index}`);
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}
// export const deleteProjectData = (index) =>{
//     return async(dispatch) =>{
//         try {
//             const response = await axios.delete(`http://localhost:8043/projects/${index}`);
//             dispatch(deletingTheProject(index))
//             console.log('Resource deleted successfully.', response.data);
//         } catch (error) {
//             console.log('Error deleting resource: ' + error.message);
//         }
//     }
// }
const heirarchySlice = createSlice({
    name : 'hierarchy',
    initialState,
    reducers : {
        fetchingHierarchyRequest : (state) =>{
            return {
                ...state,
                isLoadingHierarchy: true,
                hierarchyError: null,
            };
        },
        fetchingHierarchySuccess : (state, action) =>{
            console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                hierarchy : action.payload,
                isLoadingHierarchy: false,
                hierarchyError: null,
            };
        },
        fetchingHierarchyFailure : (state, action) =>{
            return {
                ...state,
                hierarchy: [],
                isLoadingHierarchy: false,
                hierarchyError: action.payload,
            };
        },
        // addingUser : (state, action) =>{
        //     console.log("Inside Reducer", action)
        //     // state.users = action.payload;
        //     let users = [...state.users];
        //     users.push(action.payload);
        //     state.users = users;
        // },
        // deletingTheProject : (state, action) =>{
        //     const updatedItems = state.users.filter((item, index) => item.id !== action.payload);
        //     console.log(updatedItems);
        //     return {
        //         ...state,
        //         projects: updatedItems,
        //     }
        // },
        // updatingUser : (state, action) =>{
        //     console.log("hello", action.payload);
        //     const updatedItems = state.users.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
        //     console.log("hello", updatedItems);
        //     return {
        //         ...state,
        //         users: updatedItems,
        //     };
        // }
    }
})
export const {
    fetchingHierarchyRequest, fetchingHierarchySuccess, fetchingHierarchyFailure
} = heirarchySlice.actions;
export default heirarchySlice.reducer;
  
