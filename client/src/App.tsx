import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from "./assets/Home";
import Listings from './assets/Listings';
import NotFound from './assets/NotFound';
import Signup from './assets/Signup';
import Login from './assets/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/listings" element = {<Listings />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/login" element = {<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
