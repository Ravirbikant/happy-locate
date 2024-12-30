import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectRoomsPage from "./pages/SelectRoomsPage";
import AddInventoryPage from "./pages/AddInventoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectRoomsPage />} />
        <Route path="/add-inventory" element={<AddInventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
