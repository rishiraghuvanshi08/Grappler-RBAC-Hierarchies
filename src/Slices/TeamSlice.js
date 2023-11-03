import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { notify } from "../Components/Toastify";
const initialState = {
    teams: [],
    isLoadingTeam: false,
    teamError: null,
}
export const getTeamData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamRequest());
          const response = await axios.get('http://localhost:8043/teams/');
          const data = response.data;
        //   console.log("data here", data);
          dispatch(fetchingTeamSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamFailure(error));
        }
    }
}
export const deleteTeamData = (index) =>{
    return async(dispatch) =>{
        try {
            await axios.delete(`http://localhost:8043/projects/${index}`);
            dispatch(deletingTheTeam(index))
        } catch (error) {
            if (error.response) {
                const msg = error.response.data.message;
                notify(msg);
            }
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateTeamData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`http://localhost:8043/projects/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeam({ id: id, details: details }));
            notify(response.data.message);
          } catch (error) {
            if (error.response) {
                const msg = error.response.data.message;
                notify(msg);
            }
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addTeamData = (name) =>{
    // console.log( user)
    return async(dispatch) =>{
        try {
            const response = await axios.post('http://localhost:8043/projects/', {name});
            dispatch(addingTeam(name));
            notify(response.data.message);
          } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
            console.error('Error storing data:', error);
          }
    }
}
const teamSlice = createSlice({
    name : 'teams',
    initialState,
    reducers : {
        fetchingTeamRequest : (state) =>{
            state.isLoadingTeam =  true;
            state.teamError = null;
        },
        fetchingTeamSuccess : (state, action) =>{
            state.teams = action.payload;
            state.isLoadingTeam =  false;
            state.teamError = null;
        },
        fetchingTeamFailure : (state, action) =>{
            state.teams = [];
            state.isLoadingTeam =  false;
            state.teamError = action.payload;
        },
        addingTeam : (state, action) =>{
            console.log("Inside Reducer", action)
            // state.users = action.payload;
            let teams = [...state.teams];
            teams.push(action.payload);
            state.teams = teams;  
        },
        deletingTheTeam : (state, action) =>{
            const updatedItems = state.teams.filter((item, index) => item.id !== action.payload);
            state.teams = updatedItems;
        },
        updatingTeam : (state, action) =>{
            const updatedItems = state.teams.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            state.teams = updatedItems;
        }
    }
})
export const {
    fetchingTeamRequest, fetchingTeamSuccess, fetchingTeamFailure, deletingTheTeam, updatingTeam, addingTeam
} = teamSlice.actions;
export default teamSlice.reducer;
  
