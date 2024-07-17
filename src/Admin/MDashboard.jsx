import styled from 'styled-components';
import { AdminLoginContainer } from './MAdminLogin';
import { Navigationbtns } from './admincomponents/btns';
import { ImTruck } from "react-icons/im";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";
import { FcManager } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';


const MDashboard = () => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const { AdminAuthenticated, AdminError, AdminMessage } = useSelector(state=>state.AdminLogin);


    useEffect(() => {
        setRefresh(prev => !prev); // Toggle state to force re-render
    }, []);
 

     const TotalDriversHandler =(e)=>{
        e.preventDefault()
        navigate('/totaldrivers')
     }

     const AttandenceHandler =(e)=>{
        e.preventDefault();
        navigate('/DriverAttendance');
     }

     const DriverBranchHandler =(e)=>{
        e.preventDefault();
        navigate('/DriverBranch');
     }
     
     const AddDriversHandler =(e)=>{
        e.preventDefault();
        navigate('/AddDrivers');
     }

     
     useEffect(()=>{
        if(AdminMessage){
          toast.success(AdminMessage)
        }
      },[AdminMessage ])
        


  return (
    <DashboardConatiner>
        <div className='top_Section'>
            <h1>Welcome , Shubhanshu </h1>
            <p>Select Button to Manage Driver's</p>
        </div>
        <Navigationbtns onclick={TotalDriversHandler} btn ="Total Drivers" btncolor="red" icons={<ImTruck />}/>
        <Navigationbtns onclick={AttandenceHandler}  btn="Attendance" btncolor={"green"} icons={<FaCalendarDays />}/>
        <Navigationbtns onclick={DriverBranchHandler}  btn={"Driver Branch"} btncolor={"blue"} icons={<FaCodeBranch />} />
        <Navigationbtns onclick={AddDriversHandler}   btn={"Add Driver"} btncolor={"yellow"} icons={<FcManager />}/>
        <Toaster position='top-center'/>
    </DashboardConatiner>
  )
}

export default MDashboard;


const DashboardConatiner = styled(AdminLoginContainer)`
    background-color: whitesmoke;
    padding: 0.5rem;

    .top_Section{
        border-radius: 1rem;
        text-align: center;
        >h1{
            font-weight: bolder;
            font-size: 1.5rem;
        }
        >p{
            font-weight: 500;
        }
    }
`