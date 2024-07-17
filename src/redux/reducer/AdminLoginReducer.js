import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    AdminLoading: false,
    AdminAuthenticated: false,
    AdminError: null,
    AdminMessage: null,
    AdminUser: null,
};


export const AdminLoginReducer = createSlice({
    name: "AdminLogin",
    initialState,
    reducers:{
        setLoading:(state, action)=>{
           state.AdminLoading = action.payload;
        },
        setisAuthenticated:(state, action)=>{
             state.AdminAuthenticated = action.payload;
        },
        setError:(state, action)=>{
            state.AdminError = action.payload
        },
        clearError:(state)=>{
            state.AdminError = null
        },
        setMessage:(state, action)=>{
            state.AdminMessage = action.payload;
        },
        clearMessage:(state)=>{
            state.AdminMessage = null
        },
        setUser:(state, action)=>{
            state.AdminUser = action.payload;
        }
    }

})

export const {setLoading, setisAuthenticated, setError, clearError, setMessage, clearMessage, setUser} = AdminLoginReducer.actions;

export default AdminLoginReducer.reducer