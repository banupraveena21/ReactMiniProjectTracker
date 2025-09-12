// src/pages/Dashboard.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TrainerView from './TrainerView';
import TraineeView from './TraineeView';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <Navbar />
      {user.role === 'trainer' ? <TrainerView /> : <TraineeView />}
    </div>
  );
};

export default Dashboard;
