import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainNavBarContainer} from '../../components/Home/MHome';
import { FaCircleArrowLeft,FaCircleArrowRight } from "react-icons/fa6";
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store';


const AttendanceManipulation = () => {
const {id} = useParams();
const [driver, setDriver] = useState(null);
const [currentDate, setCurrentDate] = useState(dayjs()); // Initialize with current date
const [attendanceData, setAttendanceData] = useState([]);


  useEffect(() => {
      const fetchDriverDetails = async () =>{
        try {
            const response = await axios.get(`${server}/admin/drivers/${id}`);
            if(!response.data){
                throw new Error('Failed to fetch driver details');
            }
            setDriver(response.data.driver);
            extractAttendanceData(response.data.driver.attendance);
        } catch (error) {
            console.error('Error fetching driver details:', error.message);
        }
      }
      fetchDriverDetails();
  }, [id]);

  const extractAttendanceData = (attendance) => {
    const year = currentDate.year();
    const month = (currentDate.month() + 1).toString(); // Months are 0-indexed in dayjs
    console.log(`Extracting data for Year: ${year}, Month: ${month}`);

    const yearRecord = attendance.find(record => record.AttendanceRecords.some(r => r.Year === year));
    if (yearRecord) {
      const monthRecord = yearRecord.AttendanceRecords[0].months.find(m => m.name === month);
      if (monthRecord) {
        setAttendanceData(monthRecord.days);
        // console.log(`Attendance data for ${month}/${year}:`, monthRecord.days);
      } else {
        setAttendanceData([]);
        // console.log(`No attendance data found for month: ${month}`);
      }
    } else {
      setAttendanceData([]);
      // console.log(`No attendance data found for year: ${year}`);
    }
  };
  useEffect(() => {
    if (driver) {
      extractAttendanceData(driver.attendance);
    }
  }, [currentDate, driver]);


 if(!driver){
    return <p> Loading driver details.....</p>
 }
  
 const {name, vehicle, mobileNumber, branchName} = driver;



  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month')); 
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleToggleAttendance = async (day) => {
    try {
        await axios.put(`${server}/admin/drivers/${id}/attendance`, {
            currentMonth: currentDate.format('YYYY-MM'),
            currentDay: day
            
        });
        // Re-fetch driver details to get updated attendance
        const response = await axios.get(`${server}/admin/drivers/${id}`);
        if (!response.data) {
            throw new Error('Failed to fetch driver details');
        }
        if(response.data.success){
            setDriver(response.data.driver);
            extractAttendanceData(response.data.driver.attendance);
        }
    } catch (error) {
        console.error('Error updating attendance:', error.message);
    }
};

    // Calculate days in current month and start day of the week
    const daysInMonth = currentDate.daysInMonth();
    const startDayOfWeek = currentDate.startOf('month').day();
  
    // Generate array of day names for headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
     
  return (
    <UserProfileConatiner>
        <div className='userinfo'>
                <h1>Driver Information</h1>
            <div>
                <p><span>Name</span>: {name}</p>
                <p><span>Vehicle</span>: {vehicle}</p>
                <p><span>Mobile</span>: {mobileNumber}</p>
                <p><span>Branceh </span>: {branchName}</p>
            </div>
        </div>
         
         <div className='ClanderConatienr'>
            <div className='Clanderheader'>
            <FaCircleArrowLeft onClick={handlePrevMonth} />
            <h1>{currentDate.format('MMMM YYYY')}</h1>
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
               const dayStatus = attendanceData.find(d => d.day === day)?.status;
               const isPresent = dayStatus === "present";
               const isAbsent = dayStatus === "absent";
              //  console.log(`Day: ${day}, Status: ${dayStatus}`);

            return(
              <Day className='Day' 
              key={day} 
              $ispresent={isPresent}
              $isabsent={isAbsent}
               onClick={() => handleToggleAttendance(day)}>
              {day}
            </Day>
            );
         })}
        </div>

      </div>
         
         <div className='totalPersent'>
            <h1>Total Persent : {attendanceData.filter(day => day.status === "present").length} </h1>
         </div>
    </div>
    </UserProfileConatiner>
  )
}

export default AttendanceManipulation;

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
    background-color: ${({ $ispresent, $isabsent }) => ($ispresent ? 'green' : $isabsent ? 'red' : 'transparent')};
    color: ${({ $ispresent, $isabsent }) => ($ispresent || $isabsent ? 'white' : 'black')};
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.$ispresent ? '#45a045' : '#e0e0e0')};
    }
        
`