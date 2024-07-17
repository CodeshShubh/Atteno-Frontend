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


export const server = "http://localhost:4000/api/v1";
