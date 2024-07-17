import styled from 'styled-components';
import img from '../assets/adminLoginImage.png'
import { OrangeButton } from '../components/Home/MHome';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogin } from '../redux/actions/AdminLoginAction';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const MAdminLogin = () => {

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);
 
const {AdminLoading, } = useSelector(state=>state.AdminLogin);  //AdminAuthenticated, AdminError, AdminMessage 

  const [AdminUserId, setAdminUserId] = useState("");
const [Password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();

const AdminLoginHandler =(e)=>{
   e.preventDefault();
   dispatch(AdminLogin({AdminUserId, Password}));
}

// useEffect(()=>{
//   if(AdminAuthenticated){
//     navigate('/admindashboard')
//   }
//   if(AdminError){
//     toast.error(AdminError)
//   }
//   if(AdminMessage){
//     toast.success(AdminMessage)
//   }
// },[ dispatch, AdminError, AdminMessage ])

  return (
    <AdminLoginContainer>
            <div className='headingtop'>
                  <h1>Welcome to Admin </h1>
                  <p>
                    Fill user creadential for manage the attendance
                  </p>
            </div>
          <div className='image'>
          <img src={img} alt='adminloginPageImage'/>
          </div>
          <form onSubmit={AdminLoginHandler} className='Inputfilds'>
              <input 
              type='text' 
              value={AdminUserId} 
              placeholder='User Id' 
              onChange={(e)=>setAdminUserId(e.target.value)} />
              <input 
              type='password' 
              value={Password} 
              placeholder='Password' 
              onChange={(e)=>setPassword(e.target.value)}/>
              <OrangeButton type='submit'>{ AdminLoading ? "Login... ": "Login"}</OrangeButton>
          </form>
          <div className='bottomurl'>
              <p>Request For a Account <Link>Click here</Link> </p>
          </div>
          <Toaster position='top-center'/>
    </AdminLoginContainer>
  )
}

export default MAdminLogin;

export const AdminLoginContainer = styled.div`
  max-width: 1440px;
  max-height: 844px;
  background-color: white;

  .headingtop{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    >h1{
      font-weight: bolder;
      font-size: 2rem;
      padding: 1rem;
      margin-top: 2rem;
    }
    >p{
      font-weight: 600;
      font-size: 1rem;
    }
  }

.image{
  display: flex;
  justify-content: center;
  align-items: center;
  >img{
    height: 250px;
    width: 280px;
    border-radius: 15px;
    margin: 4rem;
    background-color: white;
  }
  
}

.Inputfilds{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin: 0 1rem;
  >input{
    width: 100%;
    padding: 1rem;
    border-radius: 1rem ;
    background-color: whitesmoke;

    
  }
}
  .bottomurl{
    text-align: center;
    padding: 1.1rem;
    font-weight: bolder;
    >p>a{
      color: #FE6F23;
    }
  }
`