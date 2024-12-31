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
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "../pages/addInventory.css";

import {
  updateInventory,
  updateCategoryInventory,
} from "../redux/slices/inventorySlice";
import data from "../data/inventory.json";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const AddInventoryPage = () => {
  const { items } = data;
  const selectedRooms = useSelector((state) => state.inventory.selectedRooms);
  const inventoryByRoom = useSelector(
    (state) => state.inventory.inventoryByRoom
  );
  const inventoryByCategory = useSelector(
    (state) => state.inventory.inventoryByCategory
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for Room Wise, 1 for Category Wise
  const [activeCategoryTab, setActiveCategoryTab] = useState(0); // 0 for All, 1 for Electrical, 2 for Furniture, 3 for Small Appliance
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
    const roomCount = selectedRooms.reduce((total, room) => {
      const count = inventoryByRoom[room]?.[itemName] || 0;
      return total + count;
    }, 0);
    const categoryCount = inventoryByCategory[itemName] || 0;
    return roomCount + categoryCount;
  };

  const handleCategoryTabChange = (event, newValue) => {
    setActiveCategoryTab(newValue);
  };

  const countItemsByCategory = (category) => {
    if (category === "All") return items?.length;
    return items.filter((item) => item.category === category).length;
  };

  // Filter items based on the selected category and search query
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeCategoryTab === 0) return matchesSearch; // All items
    if (activeCategoryTab === 1)
      return item.category === "Electrical Appliance" && matchesSearch;
    if (activeCategoryTab === 2)
      return item.category === "Furniture" && matchesSearch;
    return item.category === "Small Appliance" && matchesSearch;
  });

  function ItemCard({ item }) {
    const currentCount = calculateTotalItemCount(item?.name) || 0;

    const handleUpdateInventoryCategory = (value) => {
      const newCount = Math.max(currentCount + value, 0);
      console.log(currentCount, value, newCount);

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
            <IconButton onClick={() => {}}>
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
            <Box>
              {selectedRooms?.map((room, index) => (
                <Accordion key={index}>
                  <AccordionSummary>
                    <Typography variant="h6">{room}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <TextField
                        label="Search Items"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      <Tabs
                        value={activeCategoryTab}
                        onChange={handleCategoryTabChange}
                        centered
                      >
                        {categories.map((category, index) => (
                          <Tab key={index} label={category} />
                        ))}
                      </Tabs>

                      <Box display="flex" flexWrap="wrap" gap={2}>
                        {filteredItems?.map((item) => (
                          <Box key={item.id} sx={{ width: 150 }}>
                            <Typography>{item.name}</Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <IconButton
                                onClick={() =>
                                  handleUpdateInventoryRoom(room, item.name, -1)
                                }
                              >
                                <Remove />
                              </IconButton>
                              <Typography>
                                {inventoryByRoom[room]?.[item.name] || 0}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  handleUpdateInventoryRoom(room, item.name, 1)
                                }
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
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

          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Box>

          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              position="absolute"
              bgcolor="background.paper"
              p={4}
              borderRadius={2}
            >
              <Typography variant="h6">Selected Inventory</Typography>
              <List>
                {items?.map((item) => {
                  const totalItemCount = calculateTotalItemCount(item.name);
                  return (
                    totalItemCount > 0 && (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={`${item.name}: ${totalItemCount}`}
                        />
                      </ListItem>
                    )
                  );
                })}
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default AddInventoryPage;
