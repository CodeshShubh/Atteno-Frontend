import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BackwardArrow } from '../admincomponents/btns';
import { useNavigate } from 'react-router-dom';
import { OrangeButton } from '../../components/Home/MHome';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx'; 

const Attendance = () => {
    const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);

    const { AdminUser } = useSelector(state => state.AdminLogin);
    const Drivers = AdminUser?.getalldrivers || [];

     
  const today = dayjs().date(); // Today's date
  const currentMonth = dayjs().month() + 1; // Month is 0-indexed
  const currentYear = dayjs().year();

      const navigation = useNavigate();
    const BackwordArrowHandler =(e)=>{
      e.preventDefault()
        navigation('/admindashboard', { replace: true })
    }

    const driversWithStatus = useMemo(() => {
        return Drivers.map(driver => {
          const attendanceRecords = driver.attendance.find(record => record.AttendanceRecords.some(r => r.Year === currentYear));
          const monthRecord = attendanceRecords?.AttendanceRecords.find(r => r.Year === currentYear)?.months.find(month => parseInt(month.name) === currentMonth);
          const presentDays = monthRecord?.days.filter(day => day.status === 'present').length || 0;
          const absentDays = monthRecord?.days.filter(day => day.status === 'absent').length || 0;
          const totalTrips = presentDays + absentDays; // Assuming total trips is the sum of present and absent days
    
          return {
            ...driver,
            present: presentDays,
            absent: absentDays,
            totalTrips: totalTrips,
          };
        });
      }, [Drivers, currentMonth, currentYear]);

     const handleDownload =()=>{
        const worksheet = XLSX.utils.json_to_sheet(driversWithStatus);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Drivers Attendance')
        XLSX.writeFile(workbook, 'drivers_attendancd.xlsx')
     };



    return (
        <Container>
            <div className='backwordArrow'>
               <BackwardArrow onClick={BackwordArrowHandler} />
            </div>
            <DriverAttendanceContainer>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Vehicle</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Total Trip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driversWithStatus.map((driver) => (
                            <tr key={driver._id}>
                                <td >{driver.name}</td>
                                <td>{driver.vehicle}</td>
                                <td style={{ backgroundColor: "green", color: "white" }}>{driver.present}</td>
                                <td style={{ backgroundColor: "red", color: "white" }}>{driver.absent}</td>
                                <td style={{ backgroundColor: "blue", color: "white" }}>{driver.totalTrips}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DriverAttendanceContainer>
            <OrangeButton onClick={handleDownload}>Download</OrangeButton>
        </Container>
    );
};

export default Attendance;

const Container = styled.div`
    max-width: 390px;
    margin: 0 auto;
    .backwordArrow{
        font-weight: bolder;
        font-size: 2rem;
        margin: 1rem;
    }
`;

const DriverAttendanceContainer = styled.div`
    margin-top: 2rem;
    padding: 0.2rem;
    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            border: 1px solid #ddd;
            padding: 2px;
            text-align: center;
            font-size: 1rem;
        }

        th {
            background-color: #FE6F23;
            color: white;
            font-weight: bolder;
            font-size: 1rem;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }
    }
`;


