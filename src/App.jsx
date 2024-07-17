
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import { lazy, useEffect, Suspense, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

import './App.css'
const MLogin = lazy(()=>import('./components/Login/MLogin'));
const MHome = lazy(()=>import('./components/Home/MHome'));
const MUserProfile = lazy(()=>import('./components/User/MUserProfile'));


//Admin Routes
const MAdminLogin = lazy(()=>import('./Admin/MAdminLogin'));
const MDashboard = lazy(()=>import('./Admin/MDashboard'));


//manage Data
const TotalDrivers = lazy(()=>import('./Admin/ManageData/TotalDrivers'));
const Attendance = lazy(()=>import('./Admin/ManageData/Attendance'));
const DriverBranch = lazy(()=>import('./Admin/ManageData/DriverBranch'));
const AddDrivers = lazy(()=>import('./Admin/ManageData/AddDrivers'));


import { useDispatch, useSelector } from 'react-redux';
import Loader from './Layout/Loader/Loader';
import { loadUser } from './redux/actions/driverAction';
import ProtectedRoute from '../ProtectedRoute';
import { AdminloadDrivers, getAdminProfile } from './redux/actions/AdminLoginAction';
import AttendanceManipulation from './Admin/ManiPulate Data/AttendanceManipulation';
import NotFound from '../NotFound';



function App() {

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(prev=>!prev)
  }, [])
  


  const dispatch = useDispatch();
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

 const {isAuthenticated, loading} = useSelector((state)=>state.driver);
 const {AdminAuthenticated} = useSelector((state)=>state.AdminLogin);
          


useEffect(()=>{
    dispatch(loadUser());
    dispatch(getAdminProfile());
    dispatch(AdminloadDrivers());
},[dispatch])





  return (
    <ChakraProvider>
      <Router>
         {
          loading ? (<Loader/>) : (
              <> 
              <Suspense fallback={<Loader/>}>
                  <ErrorBoundary>
                  <Routes>
                  <Route path='/' element={<MHome/> }/>

                  <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/user" >
                    <MLogin/>
                  </ProtectedRoute> }/>

                  <Route path='/user' element={ <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo='/login'>
                    <MUserProfile />
                  </ProtectedRoute> }/>


                        {/* for Admin dashboard */}
                  <Route path='/adminlogin' element={<ProtectedRoute isAuthenticated={!AdminAuthenticated} redirectTo='/admindashboard'>
                    <MAdminLogin/>
                  </ProtectedRoute> }/>
                  <Route path='/admindashboard' element={<ProtectedRoute isAuthenticated={AdminAuthenticated} redirectTo='/adminlogin'>
                    <MDashboard/>
                  </ProtectedRoute>}/>
                  {/* Manage Data */}
                  <Route path='/totaldrivers' element={<ProtectedRoute isAuthenticated={AdminAuthenticated}>
                    <TotalDrivers/>
                  </ProtectedRoute> }/>
                  <Route path='/DriverAttendance' element={<ProtectedRoute isAuthenticated={AdminAuthenticated}>
                    <Attendance/>
                  </ProtectedRoute> }/>
                  <Route path='/DriverBranch' element={<ProtectedRoute isAuthenticated={AdminAuthenticated}>
                    <DriverBranch/>
                  </ProtectedRoute> }/>
                  <Route path='/AddDrivers' element={<ProtectedRoute isAuthenticated={AdminAuthenticated}>
                    <AddDrivers/>
                  </ProtectedRoute> }/>
                  <Route path='/drivers/:id' element={<ProtectedRoute isAuthenticated={AdminAuthenticated}>
                    <AttendanceManipulation />
                  </ProtectedRoute> }/>
                  <Route path="*" element={<NotFound />} />


                </Routes>
                  </ErrorBoundary>
              </Suspense>
              </>
          )
         }
      </Router>
      </ChakraProvider>
  )
}

export default App;
