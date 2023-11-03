import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {notify} from "../Components/Toastify.js"
import Swal from "sweetalert2";
const initialState = {
    projects: [],
    isLoadingProject: false,
    projectError: null,
}
export const getProjectData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingDataRequest());
          const response = await axios.get('http://localhost:8080/projects/');
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingDataSuccess(data));
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
          dispatch(fetchingDataFailure(error));
        }
    }
}
export const deleteProjectData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8080/projects/${index}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheProject(index))
            Swal.fire(
                'Deleted!',
                'Your Project has been deleted.',
                'success'
                )
        } catch (error) {
            if (error.response) {
               notify(error.response.data.message);
            }
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const deleteProjectTeamData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8080/projects/${index}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheProject(index))
        } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
             }
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateProjectData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`http://localhost:8080/projects/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingProject({ id: id, details: details }));
            notify(response.data.message);
          } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
             }
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addProjectData = (project) =>{
    // console.log( user)
    return async(dispatch) =>{
        try {
            const response = await axios.post('http://localhost:8080/projects/', project);
            dispatch(addingProject(response.data.data));
            console.log(response.data.data);
            notify(response.data.message);
        } catch (error) {
            if (error.response) {
                const msg = error.response.data.message;
                notify(msg);
            }
            console.error('Error storing data:', error);
        }
    }
}
export const addProjecTeamData = (projectId, teamId) =>{
    // console.log( user)
    return async(dispatch) =>{
        try {
            const response = await axios.post(`http://localhost:8080/projects/${projectId}/teams/${teamId}`);
            // dispatch(addingProjectTeam(response.data.data));
            console.log(response.data)
            notify(response.data.message);
        } catch (error) {
            if (error.response) {
                const msg = error.response.data.message;
                notify(msg);
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
            state.isLoadingProject = true;
            state.projectError = null;
        },
        fetchingDataSuccess : (state, action) =>{
            state.projects = action.payload;
            state.isLoadingProject = false;
            state.projectError = null;
        },
        fetchingDataFailure : (state, action) =>{
            state.projects = [];
            state.isLoadingProject = false;
            state.projectError = action.payload;
        },
        addingProject : (state, action) =>{
            let projects = [...state.projects];
            projects.push(action.payload);
            state.projects = projects;
        },
        deletingTheProject : (state, action) =>{
            const updatedItems = state.projects.filter((item, index) => item.id !== action.payload);
            state.projects = updatedItems;
        },
        updatingProject : (state, action) =>{
            const updatedItems = state.projects.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            state.projects = updatedItems;
        },
        addingProjectTeam: (state, action) =>{

        }
    }
})
export const {
    fetchingDataRequest, fetchingDataSuccess, fetchingDataFailure, deletingTheProject, updatingProject, addingProject, addingProjectTeam
} = projectSlice.actions;
export default projectSlice.reducer;
  
