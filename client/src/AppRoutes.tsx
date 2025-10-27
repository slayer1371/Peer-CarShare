import { Route, Routes } from 'react-router'
import Home from "./assets/pages/Home";
import Listings from './assets/pages/Listings';
import NotFound from './assets/pages/NotFound';
import Signup from './assets/pages/Signup';
import Login from './assets/pages/LoginPage';
import Dashboard from './assets/pages/Dashboard';
import Profile from './assets/pages/Profile';
import AddListing from './assets/pages/AddListing';
import MyListings from './assets/pages/MyListings';
import { ProtectedRoute } from './assets/Components/Protected';

export default function AppRoutes() {
    return <>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/listings" element = {<Listings />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/login" element = {<Login />} />
          <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/add-listing" 
        element={
          <ProtectedRoute>
            <AddListing />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-listings" 
        element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
        </Routes>
    </>
}