import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProducersList from "../pages/Producers/ProducersList";
import ProducerPost from "../pages/Producers/ProducersPost";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="*" element={<Dashboard />} />
    <Route path="producers" element={<ProducersList />} />
    <Route path="producers/register" element={<ProducerPost />} />
  </Routes>
);

export default AppRoutes;
