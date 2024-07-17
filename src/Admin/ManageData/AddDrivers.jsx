import styled from "styled-components";
import { OrangeButton } from '../../components/Home/MHome';
import axios from 'axios';
import {server} from '../../redux/store'
import { useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const AddDrivers = () => {

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    mobileNumber: '',
    DLnumber: '',
    branchName: ''
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/admin/Addnewdriver`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success("Driver added successfully!")
        // Reset form or perform any other actions
        setFormData({
          name: '',
          vehicle: '',
          mobileNumber: '',
          DLnumber: '',
          branchName: ''
        });
        navigate('/totaldrivers')
      }
    } catch (error) {
      console.error("Error adding driver:", error);
      toast.error(error.response?.data?.message || "Failed to add driver");
    }
  };


  return (
    <AddDriversConatiner>
      <div className="top_heading">
        <h1>Add Drivers</h1>
        <p>Add Drivers Branch,Name,Vehicle Number</p>
      </div>
      
     <div className="form_Container">
      <form onSubmit={handleSubmit}>
          <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} />
          <input type="text" name="name" placeholder="Driver Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="vehicle" placeholder="Vehicle Number" value={formData.vehicle} onChange={handleChange} />
          <input type="tel" name="mobileNumber" placeholder="Mobile Name" value={formData.mobileNumber} onChange={handleChange} />
          <input type="number" name="DLnumber" placeholder="Last 4 digit of DL" value={formData.DLnumber} onChange={handleChange} />
          <OrangeButton type="submit">Add Drivers</OrangeButton>
      </form>
     </div>
     <Toaster position="top-center"/>
    </AddDriversConatiner>
  )
} 

export default AddDrivers;

const AddDriversConatiner = styled.div`
 max-width: 1440px;
 min-height: 844px;
 padding: 0.5rem;
 background-color: white;
 .top_heading{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 3rem 0;
  >h1{
    font-weight: bolder;
    font-size: 2rem;
  }
  >p{
    font-weight: 800;
  }
 }

 .form_Container{
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  >form{
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 1rem;
    margin-top:2rem ;
    >input{
      padding: 1rem;
      background-color: whitesmoke;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    }
  }
 }
`