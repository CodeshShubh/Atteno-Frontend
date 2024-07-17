import { server } from "../store";
import {setError, setLoading, setMessage, setUser, setisAuthenticated} from '../reducer/AdminLoginReducer'
import axios from "axios";

export const AdminLogin = ({AdminUserId, Password})=> async(dispatch)=>{
    try {
       dispatch(setLoading(true))
       const {data} =  await axios.post(`${server}/admin/login`, 
        {AdminUserId, Password},
        { withCredentials:true }
       );
       dispatch(setUser(data));
       dispatch(setisAuthenticated(true));
       dispatch(setMessage("Login successfull"))
    } catch (error) {
        dispatch(setError(error.response.data.message))
    } finally{
        dispatch(setLoading(false))
    }
};


export const getAdminProfile =()=> async (dispatch)=>{
    try {
        dispatch(setLoading(true));
        const {data} = await axios.get(
            `${server}/admin/getadminprofile`,
            {
                withCredentials: true,
            }
        );
        dispatch(setUser(data));
        dispatch(setisAuthenticated(true));
    } catch (error) {
        dispatch(setError(error.response.data.message));
    } finally{
        dispatch(setLoading(false));
    }
};



export const AdminloadDrivers = ()=> async (dispatch)=>{
    try {
     dispatch(setLoading(true));
     const {data}= await axios.get(
         `${server}/admin/fetch/drivers`,
         {
             withCredentials:true,
         });
     dispatch(setUser(data));
     dispatch(setisAuthenticated(true));
    } catch (error) {
     dispatch(setError(error.response.data.message));
    } finally{
     dispatch(setLoading(false));
    }
};