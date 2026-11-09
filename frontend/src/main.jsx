import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './landing_page/Universal/Navbar.jsx'
import Home from './landing_page/Home/Home.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Individual from './landing_page/Show/individual.jsx'
import Edit from './landing_page/Show/Edit.jsx'
import New from './landing_page/Show/New.jsx'
import Login from './landing_page/Home/Login.jsx'
import Signup from './landing_page/Home/Signup.jsx'


createRoot(document.getElementById('root')).render(
<BrowserRouter> 
  <Routes>
    <Route path='/listings' element={<Home />} />
    <Route path='/listing/:id' element={<Individual />} />
    <Route path='/listing/:id/edit' element={<Edit />} />
    <Route path='/new' element={<New />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
  </Routes>
</BrowserRouter>
)
  