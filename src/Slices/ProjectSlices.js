import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    projects: [],
    isLoadingProject: false,
    projectError: null,
}
export const getProjectData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingDataRequest());
          const response = await axios.get('http://localhost:8043/projects/');
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingDataSuccess(data));
        } catch (error) {
          dispatch(fetchingDataFailure(error));
        }
    }
}
export const deleteProjectData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8043/projects/${index}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheProject(index))
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const deleteProjectTeamData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8043/projects/${index}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheProject(index))
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateProjectData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`http://localhost:8043/projects/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingProject({ id: id, details: details }));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addProjectData = (name) =>{
    // console.log( user)
    return async(dispatch) =>{
        try {
            const response = await axios.post('http://localhost:8043/projects/', {name});
            console.log("HERE RESPONSE", response.data.data);
            dispatch(addingProject(name));
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
const projectSlice = createSlice({
    name : 'projects',
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
            console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                projects : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingDataFailure : (state, action) =>{
            return {
                ...state,
                projects: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingProject : (state, action) =>{
            let projects = [...state.projects];
            projects.push(action.payload);
            state.projects = projects;
        },
        deletingTheProject : (state, action) =>{
            const updatedItems = state.projects.filter((item, index) => item.id !== action.payload);
            return {
                ...state,
                projects: updatedItems,
            }
        },
        updatingProject : (state, action) =>{
            // console.log("hello", action.payload);
            const updatedItems = state.projects.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            // console.log("hello", updatedItems);
            return {
                ...state,
                projects: updatedItems,
            };
        }
    }
})
export const {
    fetchingDataRequest, fetchingDataSuccess, fetchingDataFailure, deletingTheProject, updatingProject, addingProject
} = projectSlice.actions;
export default projectSlice.reducer;
  
