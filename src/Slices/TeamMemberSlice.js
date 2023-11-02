import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
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
          const response = await axios.get(`http://localhost:8043/team-members/${teamId}`);
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingTeamMemberSuccess(data));
        } catch (error) {
          dispatch(fetchingTeamMemberFailure(error));
        }
    }
}
export const deleteTeamMemberData = (index) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.delete(`http://localhost:8043/projects/${index}`);
            console.log('Resource deleted successfully.', response.data);
            dispatch(deletingTheTeamMember(index))
        } catch (error) {
            console.log('Error deleting resource: ' + error.message);
        }
    }
}
export const updateTeamMemberData = (id, name) =>{
    return async(dispatch) =>{
        try {
            let details = { name };
            const response = await axios.put(`http://localhost:8043/projects/${id}`, details);
            console.log('Resource updated successfully.', response.data);
            dispatch(updatingTeamMember({ id: id, details: details }));
          } catch (error) {
            console.log('Error updating resource: ' + error.message);
          }
    }
}
export const addTeamMemberData = (teamId, userId) =>{
    return async(dispatch, getState) =>{
        try {
            await axios.post(`http://localhost:8043/team-members/${teamId}/add-new-member/${userId}`);
            // const {users}  = useSelector((state) => state.userList);
            // console.log("users", users);
            // const store = getState().userList;
            // console.log("HERE I AM USING ",store);
            dispatch(addingTeamMember());
          } catch (error) {
            if (error.response) {
                // const status = error.response.status;
                alert(error.response.data.message);
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
        addingTeamMember : (state, action) =>{
            const store = store.getState();
            console.log("ADDING TEAM MEMBER", store.userList);
            console.log("Inside Reducer", action)
            // state.users = action.payload;
            let teamMember = [...state.teamMember];
            teamMember.push(action.payload);
            state.teamMember = teamMember;  
        },
        deletingTheTeamMember : (state, action) =>{
            const updatedItems = state.teamMember.filter((item, index) => item.id !== action.payload);
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
  
