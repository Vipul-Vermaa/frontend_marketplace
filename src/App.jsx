import React, { useEffect } from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './components/styles/app.scss'

import Home from './components/home/Home.jsx'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'
import UpdateProfile from './components/profile/UpdateProfile.jsx'
import ChangePassword from './components/profile/ChangePassword.jsx'
import Profile from "./components/profile/Profile.jsx"
import Subscribe from './components/payment/Subscribe.jsx'
import PaymentSuccess from './components/payment/PaymentSuccess.jsx'
import PaymentFail from './components/payment/PaymentFail.jsx'
import CreateItems from "./components/inventory/CreateItems.jsx"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-hot-toast'
import {ProtectedRoute} from 'protected-route-react'
import {loadUser} from './redux/actions/user.js'
import Items from "./components/inventory/Items.jsx"


function App() {
  window.addEventListener('contextmenu',e=>{
    e.preventDefault()
  })

  const {isAuthenticated,user,message,error}=useSelector(state=>state.user)

  const dispatch=useDispatch()
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
  }, [dispatch,error,message])

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/login' ><Register/></ProtectedRoute>}/>
        

        <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><Login/></ProtectedRoute>}/>
        
        <Route path="/createinventory" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><CreateItems/></ProtectedRoute>} />
        <Route path="inventory/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Items/></ProtectedRoute>} />

        <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><UpdateProfile/></ProtectedRoute>} />
        <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile/></ProtectedRoute>} />
        

        <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Subscribe/></ProtectedRoute>}/>
        <Route path="/paymentsuccess" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><PaymentSuccess/></ProtectedRoute>} />
        <Route path="/paymentfail" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><PaymentFail/></ProtectedRoute>} />

      </Routes>
    </Router>
  )
}

export default App
