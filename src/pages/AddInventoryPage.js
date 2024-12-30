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
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import {
  updateInventory,
  updateCategoryInventory,
} from "../redux/slices/inventorySlice";
import data from "../data/inventory.json";

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
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Tabs for Room Wise and Category Wise */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Room Wise" />
        <Tab label="Category Wise" />
      </Tabs>

      {activeTab === 0 && (
        // Room Wise View
        <Box>
          {selectedRooms?.map((room, index) => (
            <Accordion key={index}>
              <AccordionSummary>
                <Typography variant="h6">{room}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {items?.map((item) => (
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
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {activeTab === 1 && (
        // Category Wise View
        <Box display="flex" flexWrap="wrap" gap={2}>
          {items?.map((item) => (
            <Box key={item.id} sx={{ width: 150 }}>
              <Typography>{item.name}</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={() => handleUpdateInventoryCategory(item.name, -1)}
                >
                  <Remove />
                </IconButton>
                <Typography>{calculateTotalItemCount(item.name)}</Typography>
                <IconButton
                  onClick={() => handleUpdateInventoryCategory(item.name, 1)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>
          ))}
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
                    <ListItemText primary={`${item.name}: ${totalItemCount}`} />
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
  );
};

export default AddInventoryPage;
