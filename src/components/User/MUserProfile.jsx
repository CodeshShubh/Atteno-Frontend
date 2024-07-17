import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainNavBarContainer, OrangeButton } from '../Home/MHome';
import { FaCircleArrowLeft,FaCircleArrowRight } from "react-icons/fa6";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, markAttendance } from '../../redux/actions/driverAction';
import toast, { Toaster } from 'react-hot-toast';


const MUserProfile = () => {

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);


  const dispatch = useDispatch();
  const { user, loading, message} = useSelector((state)=>state.driver);
  const data = user?.newDriver;
  const AttendanceArray = user?.newDriver?.attendance;


const [currentDate, setCurrentDate] = useState(dayjs());
const [attendanceData, setAttendanceData] = useState([]);

  const daysInMonth = currentDate.daysInMonth();
  const currentMonthYear = currentDate.format('DD-MMM-YYYY');
  const startDayOfWeek = currentDate.startOf('month').day();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (AttendanceArray && AttendanceArray.length > 0) {
      const currentYear = currentDate.year(); 
      const currentMonth = currentDate.month() + 1; // dayjs months are 0-indexed
  
      const currentYearAttendance = AttendanceArray.find(
        (record) => record.AttendanceRecords.find((yr) => yr.Year === currentYear)
      );
  
      if (currentYearAttendance) {
        const monthData = currentYearAttendance.AttendanceRecords[0].months.find(
          (month) => parseInt(month.name) === currentMonth
        );
        setAttendanceData(monthData ? monthData.days : []);
      } else {
        setAttendanceData([]);
      }
    }
  }, [AttendanceArray, currentDate]);

  useEffect(()=>{
  if(message){
    toast.success(message);
  }
  },[dispatch, message])
  

  const handleMarkPresent = (e) => {
    e.preventDefault();
    const currentDay = currentDate.date();
    const currentMonth = currentDate.format('M');
    const currentYear = currentDate.year();
    const isPresent = attendanceData.some(day => day.day === currentDay && day.status === "present");

    if (!isPresent) {
       dispatch(markAttendance({currentYear, currentMonth, currentDay})).then(()=>{
                // Update the attendance data locally after successful dispatch
        setAttendanceData([...attendanceData, { day: currentDay, status: "present" }]);
        dispatch(loadUser());
       }).catch((error)=>{
        console.error('Error marking attendance:', error)
       });
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month')); 
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };
     
  return (
    <UserProfileConatiner>
        <div className='userinfo'>
                <h1>Driver Information</h1>
            <div>
                <p><span>Name</span>: { data ? data.name : "NA"}</p>
                <p><span>Vehicle</span>: {data ? data.vehicle : "NA"}</p>
                <p><span>Mobile</span>: {data ? data.mobileNumber : "NA"}</p>
                <p><span>Branceh </span>: {data ? data.branchName : "NA"}</p>
            </div>
        </div>
         
         <div className='ClanderConatienr'>
            <div className='Clanderheader'>
            <FaCircleArrowLeft onClick={handlePrevMonth} />
            <h1>{currentMonthYear}</h1>
            <FaCircleArrowRight onClick={handleNextMonth} />
            </div>

        <div className='Calendar'>
        <div className='CalendarGrid'>
          {dayNames.map((dayName) => (
            <div className='DayHeader' key={dayName}>{dayName}</div>
          ))}
          {Array.from({ length: startDayOfWeek }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
               const day = i+1;
              const isPresent = attendanceData.some(d => d.day === day && d.status === "present");
            return(
              <Day className='Day' key={day} $ispresent={isPresent}>
              {day}
            </Day>
            );
         })}
        </div>
        <OrangeButton onClick={handleMarkPresent}>
         { loading ? "Marking..." : "Mark Present"}
          </OrangeButton>
      </div>
         
         <div className='totalPersent'>
            <h1>Total Persent : {attendanceData.filter(day => day.status === "present").length} </h1>
         </div>
    </div>
      <Toaster position='top-center' />
    </UserProfileConatiner>
  )
}

export default MUserProfile;

const UserProfileConatiner = styled(MainNavBarContainer)`
    background-color: white;
    padding: 0.5rem;

    .userinfo{
        background-color: #8C5CB3;
        text-align: center;
        border-radius: 1.5rem;
        >h1{
            font-weight: bolder;
            font-size: 2rem;
        }
       >div{
           display: flex;
           flex-direction: column;
           justify-content: start;
           align-items: start;
           background-color: #FE6F23;
           margin: 0.5rem;
           padding: 1rem;
           border-radius: 1.5rem;
           >p{
            font-weight: 500;
            font-size: 1rem;

            >span{
                font-weight: bolder;
                font-size: 1.2rem;
            }
           }
        
       }
    }


    .ClanderConatienr{
        background-color: whitesmoke;
        margin-top: 1rem;
        .Clanderheader{
            display: flex;
            justify-content: space-between;
            font-weight: bolder;
            font-size: 1.5rem;
            padding: 1rem;
        }
        .Calendar{
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .CalendarGrid{
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
        }
        .DayHeader{
            font-weight: bold;
            text-align: center;
        }
    }

    .totalPersent{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        font-size: 2rem;
        padding: 0.5rem;
    }
`

const Day = styled.div`


    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${(props) => (props.$ispresent ? '#4caf50' : '#fff')};
    color: ${(props) => (props.$ispresent ? '#fff' : '#000')};
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.$ispresent ? '#45a045' : '#e0e0e0')};
    }
        
`