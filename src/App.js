import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectInventoryPage from "./pages/SelectInventoryPage";
import AddInventoryPage from "./pages/AddInventoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectInventoryPage />} />
        <Route path="/add-inventory" element={<AddInventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
