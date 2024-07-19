import styled from 'styled-components';
import VectorTruck from '../../assets/VectorTruck.jpg'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';

const MHome = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev);  //Toggle state to force re-render
  }, []);
  return (
    <MainNavBarContainer>
      <div className='logo'>
        <h1>ATT<span>ENO</span> </h1>
      </div>
      <div className='homeImg'>
        <img src={VectorTruck} alt='TruckIMG'/>
      </div>
      <div className='content'>
         <h1>Drivers Attendance</h1>
         <h3>Easy & Safe</h3>
         <p>Welcome to our logistics app, where you can track, contract, manage your shipments easily and efficiently!</p>
      </div>
      <OrangeButton onClick={()=>navigate('/login')} >Get started <MdKeyboardDoubleArrowRight/> </OrangeButton>

      <div className='BottomContent'>
        <p>If you are Admin Click Here</p>
        <Link to={'/adminlogin'}>Login Here</Link>
      </div>
      
     
    </MainNavBarContainer>
  )
}

export default MHome;


export const MainNavBarContainer = styled.div`
 max-width: 100%; /* Adjust to fit within the viewport */
max-height: 844px;
margin: 0 auto;
background-color: #8C5CB3;
padding: 1rem;
display: flex;
justify-content: center;
flex-direction: column;

.logo{
display: flex;
justify-content: center;
align-items: center;
padding: 0.8rem;
color: white;
min-width: 200px;
font-weight: 900;
font-size: 2rem;
border-radius: 20px 5px 5px 20px;
margin-top: 3rem;
>h1>span{
  background-color: #FE6F23;
  padding: 0.5rem;
  border-radius: 5px 20px 20px 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

   }

}

.homeImg{
  max-width: 376px;
  min-height: 256px;
 margin: 1rem auto ;
 >img{
  border-radius: 200px;
 }
 
}

.content{
  text-align: center;
  >h1{
    font-weight: 900px;
    font-size: 2rem;
    font-weight: bolder;
  }
  >h3{
    font-weight: bold;
    font-size: 1.5rem;
  }
  >p{
    font-weight: bold;
    margin-top: 1rem;
  }
}
.BottomContent{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  >p{
    font-weight: 500;
  }
  >a{
    color: #FE6F23;
    font-weight: bolder;
  }
}
`
export const OrangeButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
   min-width: 290px;
  background-color: #FE6F23;
  border-radius: 15px;
  margin:  2rem auto;
  gap: 0.5rem;
  font-size: larger;
  font-weight: bolder;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
`