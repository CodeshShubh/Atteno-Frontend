import styled from "styled-components";
import MultpleCards from "../admincomponents/MultpleCards";
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminloadDrivers } from "../../redux/actions/AdminLoginAction";
import {useDispatch} from 'react-redux';


const TotalDrivers = () => {
  const [refresh, setRefresh] = useState(false);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [driversWithStatus, setDriversWithStatus] = useState([]);


  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);

    const {AdminUser} = useSelector(state=>state.AdminLogin);
    const Drivers  = AdminUser?.getalldrivers || [] ;
    const dispatch = useDispatch();


    const today = dayjs().date(); // Today's date
    const currentMonth = dayjs().month() + 1; // Month is 0-indexed
    const currentYear = dayjs().year();

    useEffect(() => {
      dispatch(AdminloadDrivers()); //  action to fetch updated drivers
  }, [dispatch]);


   
    // Count present and absent drivers
    useEffect(() => {
      let presentCount = 0;
      let absentCount = 0;
  
      const driversWithStatus = Drivers.map(driver => {
        const attendanceRecords = driver.attendance.find(record => record.AttendanceRecords.some(r => r.Year === currentYear));
        const monthRecord = attendanceRecords?.AttendanceRecords.find(r => r.Year === currentYear)?.months.find(month => parseInt(month.name) === currentMonth);
        const dayStatus = monthRecord?.days.find(day => day.day === today)?.status;
  
        if (dayStatus === "present") {
          presentCount += 1;
        } else {
          absentCount += 1;
        }
  
        return {
          ...driver,
          isPresentToday: dayStatus === "present",
        };
      });
  
    setPresentCount(presentCount);
    setAbsentCount(absentCount);
    setDriversWithStatus(driversWithStatus);

    }, [Drivers, today, currentMonth, currentYear ]);

  return (
    <TotalDriversContainer>
           <div className="topInfo">
             <h1>Toral Drivers - {Drivers.length}</h1>
             <p>Persent - {presentCount}</p>
             <p>Absent - {absentCount}</p>
           </div>
           {
            driversWithStatus.map((driver)=>(
              <Link key={driver._id} to={`/drivers/${driver._id}`}>
                <MultpleCards key={driver._id} name={driver.name} vehicle={driver.vehicle} isPresentToday={driver.isPresentToday}
                />
                </Link>
            ))
           }
    </TotalDriversContainer>
  )
}

export default TotalDrivers;



export const TotalDriversContainer = styled.div`
    max-width: 1440px;
    min-height: 100vh;
    background-color: white;
    padding: 0.5rem;

 .topInfo{
    background-color: whitesmoke;
    margin: 0.5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >h1{
        font-size: 2rem;
        font-weight: bolder;
    }
    >p{
        font-size: 1rem;
        font-weight: bolder;
    }
 }
`