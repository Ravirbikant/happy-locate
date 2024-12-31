import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Modal,
  List,
} from "@mui/material";
import { Add, Remove, WarningAmberRounded } from "@mui/icons-material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "../pages/addInventory.css";

import {
  updateInventory,
  updateCategoryInventory,
} from "../redux/slices/inventorySlice";
import data from "../data/inventory.json";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const AddInventoryPage = () => {
  const { items } = data;
  const navigate = useNavigate();
  const selectedRooms = useSelector((state) => state.inventory.selectedRooms);
  const inventoryByRoom = useSelector(
    (state) => state.inventory.inventoryByRoom
  );
  const inventoryByCategory = useSelector(
    (state) => state.inventory.inventoryByCategory
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Electrical Appliance",
    "Furniture",
    "Small Appliance",
  ];

  const handleUpdateInventoryRoom = (room, item, delta) => {
    const currentCount = inventoryByRoom[room]?.[item] || 0;
    const newCount = Math.max(currentCount + delta, 0);
    dispatch(
      updateInventory({
        room,
        item,
        quantity: newCount,
      })
    );
  };

  const handleContinue = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const calculateTotalItemCount = (itemName) => {
    return inventoryByCategory[itemName] || 0;
  };

  const calculateTotalAllItems = () => {
    return items.reduce(
      (total, item) => total + calculateTotalItemCount(item.name),
      0
    );
  };

  const handleCategoryTabChange = (event, newValue) => {
    setActiveCategoryTab(newValue);
  };

  const countItemsByCategory = (category) => {
    if (category === "All") return items?.length;
    return items.filter((item) => item.category === category).length;
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeCategoryTab === 0) return matchesSearch;
    if (activeCategoryTab === 1)
      return item.category === "Electrical Appliance" && matchesSearch;
    if (activeCategoryTab === 2)
      return item.category === "Furniture" && matchesSearch;
    return item.category === "Small Appliance" && matchesSearch;
  });

  function RoomItemCard({ item, room }) {
    const imageSrc = `/images/${item.image}`;

    return (
      <Box key={item.id} className="w-1/2 p-2">
        <Box className="h-[147px] rounded-[4px] border border-gray-400 flex flex-col">
          <Box className="h-[110px] overflow-hidden">
            <img
              src={imageSrc}
              alt="item"
              className="w-full h-full object-cover"
            />
          </Box>
          <Box className="flex ml-2 mb-2 h-[30px] items-center justify-between">
            <Typography style={{ fontWeight: 700, fontSize: "12px" }}>
              {item.name}
            </Typography>

            <Box className="flex items-center">
              <IconButton
                className="bg-gray-100 border rounded-full"
                onClick={() => handleUpdateInventoryRoom(room, item.name, -1)}
              >
                <Remove
                  sx={{
                    color: "#2B80FF",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid #2B80FF",
                  }}
                />
              </IconButton>
              <Typography className="font-medium" style={{ color: "#2B80FF" }}>
                {inventoryByRoom[room]?.[item.name] || 0}
              </Typography>
              <IconButton
                className="bg-gray-100 border rounded-full"
                onClick={() => handleUpdateInventoryRoom(room, item.name, 1)}
              >
                <Add
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
        </Box>
      </Box>
    );
  }

  function ItemCard({ item }) {
    const currentCount = calculateTotalItemCount(item?.name) || 0;

    const handleUpdateInventoryCategory = (value) => {
      const newCount = Math.max(currentCount + value, 0);

      dispatch(
        updateCategoryInventory({
          item,
          quantity: newCount,
        })
      );
    };

    const imageSrc = `/images/${item.image}`;

    return (
      <Box className="w-1/2 p-2">
        <Box className="h-[147px] rounded-[4px] border border-gray-400 flex flex-col">
          <Box className="h-[110px] overflow-hidden">
            <img
              src={imageSrc}
              alt="item"
              className="w-full h-full object-cover"
            />
          </Box>
          <Box className="flex ml-2 mb-2 h-[30px] items-center justify-between">
            <Typography style={{ fontWeight: 700, fontSize: "12px" }}>
              {item.name}
            </Typography>
            <Box className="flex items-center">
              <>
                <IconButton
                  className="bg-gray-100 border rounded-full"
                  onClick={() => handleUpdateInventoryCategory(-1)}
                >
                  <Remove
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
                  className="font-medium"
                  style={{ color: "#2B80FF" }}
                >
                  {currentCount}
                </Typography>
                <IconButton
                  className="bg-gray-100 border rounded-full"
                  onClick={() => handleUpdateInventoryCategory(1)}
                >
                  <Add
                    sx={{
                      color: "#2B80FF",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "1px solid #2B80FF",
                    }}
                  />
                </IconButton>
              </>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex justify-center h-screen bg-gray-400">
      <Box className="w-full md:w-2/3 lg:w-1/3 h-screen relative shadow-md rounded-md bg-white">
        <Box display="flex" flexDirection="column" className="h-screen">
          <Box className="flex items-center w-full mt-4 px-4">
            <IconButton
              onClick={() => {
                navigate("/");
              }}
            >
              <KeyboardArrowLeftIcon style={{ color: "#222221" }} />
            </IconButton>

            <Typography
              className="absolute left-1/2 transform -translate-x-1/2 font-bold"
              style={{
                fontFamily: "Helvetica",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "18.4px",
              }}
            >
              Add Inventory
            </Typography>
          </Box>
          <Box className="w-full mt-2 h-1 bg-[#D9D9D9]">
            <Box className="h-1 bg-[#2B80FF]" style={{ width: "50%" }}></Box>
          </Box>
          <Box
            className="flex justify-between mx-4 my-4 items-center"
            sx={{
              background: "#F7F7F7",
              height: "44px",
              borderRadius: "12px",
            }}
          >
            <Box
              className={`flex-1 mx-1 rounded-[10px] h-[35px] tab-buttons ${
                activeTab === 0 ? "active-tab" : ""
              }`}
              onClick={() => {
                setActiveTab(0);
                setActiveCategoryTab(0);
              }}
            >
              Room Wise
            </Box>
            <Box
              className={`flex-1 mx-1 rounded-[10px] h-[35px] tab-buttons ${
                activeTab === 1 ? "active-tab" : ""
              }`}
              onClick={() => {
                setActiveTab(1);
                setActiveCategoryTab(0);
              }}
            >
              Category Wise
            </Box>
          </Box>
          {activeTab === 0 && (
            <Box className="overflow-y-auto flex-1 ">
              {selectedRooms?.map((room, index) => (
                <Box key={index}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        background: "#F7F7F7",
                        height: "44px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "16px",
                        }}
                        variant="h6"
                      >
                        {room}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Box mb={2}>
                          <div className="relative w-full">
                            <input
                              type="text"
                              placeholder="Search for items"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-2 pr-10 border rounded-[10px] h-[44px] placeholder-[#616161]"
                            />

                            <SearchOutlinedIcon
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                              style={{ fontSize: 30, color: "black" }}
                            />
                          </div>
                        </Box>

                        <Box className="flex space-x-4 overflow-x-auto scrollbar-thin mx-2 mb-2">
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              className={`cursor-pointer whitespace-nowrap capitalize flex items-center justify-center${
                                activeCategoryTab === index
                                  ? "!text-[#2B80FF] font-bold text-[14px]"
                                  : "text-black font-normal text-[12px]"
                              }`}
                              onClick={() =>
                                handleCategoryTabChange(null, index)
                              }
                            >
                              {`${category} ${countItemsByCategory(category)} `}
                            </div>
                          ))}
                        </Box>

                        <Box
                          display="flex"
                          flexWrap="wrap"
                          className="overflow-y-auto scrollbar-thin"
                        >
                          {filteredItems?.map((item) => (
                            <RoomItemCard item={item} room={room} />
                          ))}
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 1 && (
            <Box className="overflow-y-auto flex-1 scrollbar-thin h-[70vw]">
              <Box mb={2} mx={2}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 pr-10 border rounded-[10px] h-[44px] placeholder-[#616161]"
                  />

                  <SearchOutlinedIcon
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    style={{ fontSize: 30, color: "black" }}
                  />
                </div>
              </Box>

              <Box className="flex space-x-4 overflow-x-auto mx-4 mb-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer capitalize flex items-center justify-center${
                      activeCategoryTab === index
                        ? "!text-[#2B80FF] font-bold text-[14px]"
                        : "text-black font-normal text-[12px]"
                    }`}
                    onClick={() => handleCategoryTabChange(null, index)}
                  >
                    {`${category} ${countItemsByCategory(category)} `}
                  </div>
                ))}
              </Box>

              <Box
                display="flex"
                flexWrap="wrap"
                className="mx-2 overflow-y-auto"
              >
                {filteredItems?.map((item) => (
                  <ItemCard key={item?.id} item={item} />
                ))}
              </Box>
            </Box>
          )}
          <Box className="bg-[#059445] p-2 text-white flex rounded-tl-[12px] rounded-tr-[12px]">
            <Box className="w-[20%]">
              <WarningAmberRounded />
            </Box>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "15.6px",
              }}
            >
              Please ensure all inventory is added upfront. Any items added
              later during pickup will incur extra charges.
            </Typography>
          </Box>
          <Box className="bg-white p-4 flex">
            <Box className="mr-4 flex items-center">
              <Typography
                className="whitespace-nowrap mr-4"
                sx={{
                  fontSize: "14px",
                  color: "#2B80FF",
                  cursor: "pointer",
                  opacity: calculateTotalAllItems() === 0 ? 0.5 : 1, // Disabled style
                }}
                onClick={
                  !calculateTotalAllItems() !== 0 ? handleContinue : undefined
                }
              >
                View {calculateTotalAllItems()} items
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleContinue}
              disabled={calculateTotalAllItems() === 0}
              sx={{
                borderRadius: "10px",
                "&:disabled": {
                  backgroundColor: "#D1D5DB",
                  color: "#9CA3AF",
                },
              }}
            >
              Continue
            </Button>
          </Box>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              position="absolute"
              bgcolor="background.paper"
              borderRadius={2}
              className="bottom-0 left-0 right-0 bg-white p-4 w-full md:w-1/3 w-full mx-auto"
            >
              <Box>
                <Typography
                  className="flex justify-center"
                  sx={{
                    fontWeight: "700",
                    size: "16px",
                  }}
                >
                  Added Items
                </Typography>
              </Box>
              <List>
                {items?.map((item) => {
                  const totalItemCount = calculateTotalItemCount(item.name);
                  const imageSrc = `/images/${item.image}`;

                  return (
                    totalItemCount > 0 && (
                      <Box
                        className="flex justify-between items-center my-2"
                        key={item.id}
                      >
                        <Box className="flex items-center space-x-2">
                          <img
                            src={imageSrc}
                            alt="item"
                            className="w-8 h-8 rounded-full"
                          />
                          <Typography
                            sx={{
                              fontWeight: "400",
                              size: "16px",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            color: "#616161",
                            size: "16px",
                          }}
                        >
                          {totalItemCount}
                        </Typography>
                      </Box>
                    )
                  );
                })}
              </List>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default AddInventoryPage;
