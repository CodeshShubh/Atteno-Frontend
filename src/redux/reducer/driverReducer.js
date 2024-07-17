import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated:false,
    loading: false,
    error: null,
    message:null,    
};

export const driverReducer = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        },
        clearError:(state)=>{
            state.error = null;
        },
        setMessage:(state, action)=>{
            state.message = action.payload;
        }, 
        clearMessage:(state)=>{
            state.message = null;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
          },
        setMarkAttendance: (state, action)=>{
        state.user.newDriver.attendance = action.payload;
        },
    },
});

export const {setLoading, 
    setError, 
    clearError, 
    setMessage, 
    clearMessage, 
    setUser, 
    setAuthenticated, 
    setMarkAttendance } = driverReducer.actions;
    export default driverReducer.reducer;
