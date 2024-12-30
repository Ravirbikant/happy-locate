import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addRoom } from "../redux/slices/inventorySlice";

const SelectInventoryPage = () => {
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddRooms = () => {
    for (let i = 1; i <= rooms; i++) {
      dispatch(addRoom(`Room ${i}`));
    }
    navigate("/add-inventory");
  };

  return (
    <Box
      className="mt-12"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Box width="100%" maxWidth={400}>
        <TextField
          label="Number of Rooms"
          className="mt-4"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(parseInt(e.target.value))}
          fullWidth
        />
      </Box>
      <Box width="100%" maxWidth={400}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddRooms}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default SelectInventoryPage;
