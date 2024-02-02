import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";
import { API_BASE_URL } from "../Authentication";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
const initialState = {
    teamMember: [],
    isLoadingTeamMember: false,
    teamMemberError: null,
}
export const getTeamMemberData = (teamId) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingTeamMemberRequest());
          const response = await axios.get(`${API_BASE_URL}/team-members/${teamId}`);
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingTeamMemberSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamMemberFailure(error));
        }
    }
}
export const deleteTeamMemberData = (teamId, userId) =>{
    return async(dispatch) =>{
        try {
            console.log(teamId, userId, "rishiii");
            const response = await axios.delete(`${API_BASE_URL}/team-members/${teamId.id}/delete-member/${userId}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheTeamMember(userId))

            Swal.fire(
                'Deleted!',
                'Team Member has been deleted.',
                'success'
            )
            
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateTeamMemberData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`${API_BASE_URL}/projects/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeamMember({ id: id, details: details }));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
const notify = (msg) => toast(msg);
export const addTeamMemberData = (teamId, userIds) =>{
    console.log("team id and user id ", teamId,userIds);
    return async(dispatch, getState) =>{
        try {
            await axios.post(`${API_BASE_URL}/team-members/${teamId}/add-new-members`, userIds);
            const store = getState().userList;   
            dispatch(addingTeamMember({store, userIds}));
          } catch (error) {
            if (error.response) {
                notify(error.response.data.message);
            }
            console.error('Error storing data:', error);
          }
    }
}
const teamSlice = createSlice({
    name : 'teamMember',
    initialState,
    reducers : {
        fetchingTeamMemberRequest : (state) =>{
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        fetchingTeamMemberSuccess : (state, action) =>{
            console.log("DATA SUCCESS", action.payload);
            return {
                ...state,
                teamMember : action.payload,
                isLoading: false,
                error: null,
            };
        },
        fetchingTeamMemberFailure : (state, action) =>{
            return {
                ...state,
                teamMember: [],
                isLoading: false,
                error: action.payload,
            };
        },
        addingTeamMember: (state, action) => {
            const { store, userIds } = action.payload;
            let teamMember = [...state.teamMember];
            const newMembers = store.users.filter(user => userIds.includes(user.id));
            teamMember = [...teamMember, ...newMembers];
            state.teamMember = teamMember;
        },
        deletingTheTeamMember : (state, action) =>{
            const updatedItems = state.teamMember.filter((item) => item.id !== action.payload);
            return {
                ...state,
                teamMember: updatedItems,
            }
        },
        updatingTeamMember : (state, action) =>{
            // console.log("hello", action.payload);
            const updatedItems = state.teamMember.map((item) => item.id === action.payload.id ? { ...item, ...action.payload.details } : item);
            // console.log("hello", updatedItems);
            return {
                ...state,
                teamMember: updatedItems,
            };
        }
    }
})
export const {
    fetchingTeamMemberRequest, fetchingTeamMemberSuccess, fetchingTeamMemberFailure, deletingTheTeamMember, updatingTeamMember, addingTeamMember
} = teamSlice.actions;
export default teamSlice.reducer;
  
