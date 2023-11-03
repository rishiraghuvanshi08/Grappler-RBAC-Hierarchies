import {configureStore } from "@reduxjs/toolkit";
import UserSlices from "./Slices/UserSlices";
import ProjectSlices from "./Slices/ProjectSlices";
import HierachySlice from "./Slices/HierachySlice";
import TeamSlice from "./Slices/TeamSlice";
import TeamMemberSlice from "./Slices/TeamMemberSlice";
import loginSlice from '../src/Slices/loginSlice';

const store = configureStore({
    reducer:{
        getLoginStatus: loginSlice,
        userList : UserSlices,
        projectList : ProjectSlices,
        viewHierarchy : HierachySlice,
        teamsList : TeamSlice,
        teaMemberList : TeamMemberSlice,
    },
});
export default store;