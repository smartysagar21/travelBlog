import {
  Alert,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { postDelete } from "../api-helpers/Helpers";

const DiaryItem = ({
  title,
  description,
  image,
  location,
  date,
  id,
  user,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const isLoggedInUser = () => {
    if (localStorage.getItem("userId") === user) {
      return true;
    }

    return false;
  };

  const onResReceived = (data) => {
    console.log(data);
    window.location.reload(false);
  };

  const handleDelete = () => {
    postDelete(id)
      .then(onResReceived)
      .catch((err) => console.log(err));
    setOpen(true);
  };

  return (
    <Card
      sx={{
        width: "40%",
        height: "auto",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #cc",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">{<LocationOnIcon />}</IconButton>
        }
        title={location}
        subheader={date}
      />
      <img height="350" src={image} alt={title} />
      <CardContent>
        <Box paddingBottom={1}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>

          <Typography width={"auto"} fontWeight={"bold"} variant="caption">
            Travelled by: {name}
          </Typography>
        </Box>
        <hr />
        <Box display={"flex"}>
          <Typography paddingTop={2} variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>

      {isLoggedInUser() && (
        <CardActions sx={{ marginLeft: "auto" }}>
          <IconButton LinkComponent={Link} to={`/post/${id}`} color="warning">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DiaryItem;
