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

  const handleUpdateInventoryCategory = (item, delta) => {
    const currentCount = inventoryByCategory[item] || 0;
    const newCount = Math.max(currentCount + delta, 0);
    dispatch(
      updateCategoryInventory({
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset category tab to "All" when switching to Room Wise or Category Wise
    if (newValue === 1) {
      setActiveCategoryTab(0); // All tab selected by default when switching to Category Wise
    }
  };

  const handleCategoryTabChange = (event, newValue) => {
    setActiveCategoryTab(newValue);
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

  return (
    <Box className="flex justify-center h-screen bg-gray-400">
      <Box
        className="h-full relative max-w-md shadow-md rounded-md bg-white"
        style={{ minWidth: "320px" }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
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
            // Room Wise View
            <Box>
              {selectedRooms?.map((room, index) => (
                <Accordion key={index}>
                  <AccordionSummary>
                    <Typography variant="h6">{room}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" flexDirection="column" gap={2}>
                      {/* Search Bar for Room Wise */}
                      <TextField
                        label="Search Items"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      {/* Category Tabs inside Room Wise Accordion */}
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
            <Box>
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

              {/* Sub-tabs for Categories */}
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
                          handleUpdateInventoryCategory(item.name, -1)
                        }
                      >
                        <Remove />
                      </IconButton>
                      <Typography>
                        {calculateTotalItemCount(item.name)}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleUpdateInventoryCategory(item.name, 1)
                        }
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
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
