import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="*" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
