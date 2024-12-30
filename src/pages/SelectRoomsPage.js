import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addRoom } from "../redux/slices/inventorySlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const SelectRoomsPage = () => {
  const [items, setItems] = useState({
    rooms: 0,
    kitchen: 0,
    diningHall: 0,
    drawingHall: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddItems = () => {
    // Dispatch each item based on the input values
    Object.entries(items).forEach(([key, value]) => {
      for (let i = 1; i <= value; i++) {
        dispatch(addRoom(`${key.charAt(0).toUpperCase() + key.slice(1)} ${i}`));
      }
    });
    navigate("/add-inventory");
  };

  const handleIncrement = (item) => {
    setItems((prev) => ({
      ...prev,
      [item]: prev[item] + 1,
    }));
  };

  const handleDecrement = (item) => {
    setItems((prev) => ({
      ...prev,
      [item]: prev[item] > 0 ? prev[item] - 1 : 0,
    }));
  };

  const isButtonDisabled = Object.values(items).every((value) => value === 0);

  return (
    <Box
      className="mt-12"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      {Object.keys(items).map((item) => (
        <Box
          key={item}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth={400}
        >
          <Typography>
            {item.charAt(0).toUpperCase() + item.slice(1)} -
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => handleDecrement(item)}
              disabled={items[item] === 0}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{items[item]}</Typography>
            <IconButton onClick={() => handleIncrement(item)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box width="100%" maxWidth={400}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddItems}
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default SelectRoomsPage;
