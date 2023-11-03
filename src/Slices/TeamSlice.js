import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    teams: [],
    isLoadingTeam: false,
    teamError: null,
}
export const getTeamData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamRequest());
          const response = await axios.get('http://localhost:8080/teams/');
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingTeamSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamFailure(error));
        }
    }
}
export const updateTeamData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`http://localhost:8080/teams/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeam({ id: id, details: details }));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addTeamData = (teamData) =>{
     console.log( "Team data in add team ",teamData)
    return async(dispatch) =>{
        try {
            const response= await axios.post('http://localhost:8080/teams/', teamData);
            console.log("add team ",response.data.data);
            teamData.id=response.data.data
            dispatch(addingTeam(teamData));
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
const teamSlice = createSlice({
    name : 'teams',
    initialState,
    reducers : {
        fetchingTeamRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        fetchingTeamSuccess : (state, action) =>{
            console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                teams : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingTeamFailure : (state, action) =>{
            return {
                ...state,
                teams: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingTeam : (state, action) =>{
            console.log("Inside Reducer", action.payload)
            let teams = [...state.teams];
            teams.push(action.payload);
            state.teams = teams;  
        },
        updatingTeam : (state, action) =>{
            const updatedItems = state.teams.map((item) => item.id === action.payload.id ?
                                                { ...item, ...action.payload.details } : item);
            return {
                ...state,
                teams: updatedItems,
            };
        }
    }
})
export const {
    fetchingTeamRequest, fetchingTeamSuccess, fetchingTeamFailure, deletingTheTeam, updatingTeam, addingTeam
} = teamSlice.actions;
export default teamSlice.reducer;
  
