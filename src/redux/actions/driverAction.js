import {server} from '../store';
import axios from 'axios';
import { setAuthenticated, setError, setLoading, setMarkAttendance, setMessage, setUser } from '../reducer/driverReducer';


export const login = ({mobileNumber, DLnumber})=>async (dispatch)=>{
       try {
        dispatch(setLoading(true));
        const {data}= await axios.post(
            `${server}/driver/driverLogin`,
            {mobileNumber, DLnumber}, 
            { withCredentials:true }
        );
        dispatch(setUser(data));
        dispatch(setAuthenticated(true));
        dispatch(setMessage('Login Successful'))
       } catch (error) {
        dispatch(setError(error.response.data.message));
       } finally{
        dispatch(setLoading(false));
       }
};


export const loadUser = ()=>async (dispatch)=>{
    try {
     dispatch(setLoading(true));
     const {data}= await axios.get(
         `${server}/driver/getdriverprofile`,
         {
             withCredentials:true,
         });

     dispatch(setUser(data));
     dispatch(setAuthenticated(true));
    } catch (error) {
     dispatch(setError(error.response.data.message)); 
    } finally{
     dispatch(setLoading(false));
    }
};

export const markAttendance = ({currentYear, currentMonth, currentDay})=>async (dispatch) =>{

    try{
       dispatch(setLoading(true));
        // Format currentMonth as "YYYY-MM"
    const formattedMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
       const {data} = await axios.post(
           `${server}/driver/add/attendance`,
           {currentMonth:formattedMonth, currentDay},
           {
               headers:{
                   'Content-Type': 'application/json',
               },
               withCredentials: true,
           }
       );

        dispatch(setMarkAttendance(data));
        dispatch(setMessage(data.message));
    }catch(error){
        const errorMessage = 'An error occurred';
           dispatch(setError(errorMessage));             // here we are temperary adding message instted of error
    } finally{
       dispatch(setLoading(false));
      }
   
   };

