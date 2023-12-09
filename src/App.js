import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
// import Navigation from './components/Navigation';
import Bikes from './components/Bikes';
import ShowCar from './components/ShowBike';
import AddReservation from './components/AddReservation';
import AddMotorcycle from './components/AddMotorcycle';
import Layout from './components/Layout';
import ReservationList from './components/ReservationList';
import DeleteMotorcycle from './components/DeleteMotorcycle';

function AuthenticatedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="reserve"
          element={<AuthenticatedRoute element={<AddReservation />} />}
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<AuthenticatedRoute element={<Bikes />} />} />
          <Route
            path="/new-motor"
            element={<AuthenticatedRoute element={<AddMotorcycle />} />}
          />
          <Route
            path="show/:id"
            element={<AuthenticatedRoute element={<ShowCar />} />}
          />
          <Route
            path="reserve/:id"
            element={<AuthenticatedRoute element={<AddReservation />} />}
          />
          <Route
            path="reservation"
            element={<AuthenticatedRoute element={<ReservationList />} />}
          />
          <Route
            path="delete-motor"
            element={<AuthenticatedRoute element={<DeleteMotorcycle />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

AuthenticatedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default App;
