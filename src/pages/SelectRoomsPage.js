import React, { useEffect, useState } from "react";
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
    Object.entries(items).forEach(([key, value]) => {
      for (let i = 1; i <= value; i++) {
        dispatch(addRoom(`${key.charAt(0).toUpperCase() + key.slice(1)} ${i}`));
      }
    });
    navigate("/add-inventory");
  };

  useEffect(() => {
    dispatch({ type: "inventory/resetRooms" });
  }, []);

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
    <Box className="flex justify-center h-screen items-center bg-gray-400">
      <Box className="w-full md:w-2/3 lg:w-1/3 h-screen relative shadow-md rounded-md bg-white">
        <Box className="flex items-center w-full mt-4 px-4 py-5">
          <Typography
            className="absolute left-1/2 transform -translate-x-1/2 font-bold"
            style={{
              fontFamily: "Helvetica",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "18.4px",
            }}
          >
            Select Rooms
          </Typography>
        </Box>

        <Box className="w-full mt-2 h-1 bg-[#D9D9D9]">
          <Box className="h-1 bg-[#2B80FF]" style={{ width: "0%" }}></Box>
        </Box>

        {Object.keys(items).map((item) => (
          <Box
            key={item}
            className="flex justify-between items-center py-2 mx-4"
          >
            <Typography
              className="font-medium text-lg "
              style={{
                fontFamily: "Helvetica",
                fontSize: "14px",
                fontWeight: 400,
                color: "#000",
              }}
            >
              {item
                .split(/(?=[A-Z])/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>

            <Box className="flex items-center space-x-4 ">
              <IconButton
                onClick={() => handleDecrement(item)}
                disabled={items[item] === 0}
                className="bg-gray-100 border rounded-full"
              >
                <RemoveIcon
                  sx={{
                    color: "#2B80FF",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid #2B80FF",
                  }}
                />
              </IconButton>

              <Typography
                className="text-lg font-medium"
                style={{ color: "#2B80FF" }}
              >
                {items[item]}
              </Typography>
              <IconButton
                onClick={() => handleIncrement(item)}
                className="bg-gray-100 border rounded-full"
              >
                <AddIcon
                  sx={{
                    color: "#2B80FF",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid #2B80FF",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleAddItems}
            sx={{
              backgroundColor: "#2B80FF",
              borderRadius: "10px",
              fontFamily: "Helvetica",
              fontWeight: 700,
              fontSize: "16px",
              color: "white",
              height: "44px",
              textTransform: "none",
              "&:disabled": {
                backgroundColor: "#D1D5DB",
                color: "#9CA3AF",
              },
            }}
            className="w-full"
            disabled={isButtonDisabled}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectRoomsPage;
