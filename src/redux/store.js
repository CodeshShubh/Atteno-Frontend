import {configureStore} from '@reduxjs/toolkit';
import driverReducer from './reducer/driverReducer';
import  AdminLoginReducer  from './reducer/AdminLoginReducer';



export const store = configureStore({
    reducer:{
        driver: driverReducer,
        AdminLogin : AdminLoginReducer,
    },

});

export default store;


export const server = "https://backend-atteno.onrender.com/api/v1";
