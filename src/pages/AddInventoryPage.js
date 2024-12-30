import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { updateInventory } from "../redux/slices/inventorySlice";
import data from "../data/inventory.json";

const AddInventoryPage = () => {
  const { rooms } = data;
  const selectedRooms = useSelector((state) => state.inventory.selectedRooms);
  const inventoryByRoom = useSelector(
    (state) => state.inventory.inventoryByRoom
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleUpdateInventory = (room, item, delta) => {
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

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {selectedRooms?.map((room, index) => (
        <Box key={index}>
          <Typography variant="h6">{room}</Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {rooms.map((item) => (
              <Card key={item.id} sx={{ width: 150 }}>
                <CardContent>
                  <Typography>{item.name}</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      onClick={() => handleUpdateInventory(room, item.name, -1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>
                      {inventoryByRoom[room]?.[item.name] || 0}
                    </Typography>
                    <IconButton
                      onClick={() => handleUpdateInventory(room, item.name, 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
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
            {Object.entries(inventoryByRoom).map(([room, items]) =>
              Object.entries(items).map(
                ([item, count]) =>
                  count > 0 && (
                    <ListItem key={`${room}-${item}`}>
                      <ListItemText primary={`${room} - ${item}: ${count}`} />
                    </ListItem>
                  )
              )
            )}
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
