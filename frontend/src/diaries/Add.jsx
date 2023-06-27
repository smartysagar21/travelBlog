import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { addPost } from "../api-helpers/Helpers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    date: "",
  });

  const onResReceived = (data) => {
    console.log(data);
    toast.success("Post Added Successfully");
    navigate("/diaries");
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addPost(inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
        >
          Add your travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          padding={3}
          display={"flex"}
          margin={"auto"}
          flexDirection={"column"}
          width="70%"
        >
          <FormLabel sx={{ fontFamily: "quicksand" }}>Title</FormLabel>
          <TextField
            onChange={handleChange}
            name="title"
            value={inputs.title}
            variant="standard"
            margin="normal"
            required
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Description</FormLabel>
          <TextField
            onChange={handleChange}
            name="description"
            value={inputs.description}
            margin="normal"
            variant="standard"
            required
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Image URL</FormLabel>
          <TextField
            onChange={handleChange}
            name="imageUrl"
            value={inputs.imageUrl}
            margin="normal"
            variant="standard"
            required
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
          <TextField
            onChange={handleChange}
            name="location"
            value={inputs.location}
            margin="normal"
            variant="standard"
            required
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Date</FormLabel>
          <TextField
            type="date"
            onChange={handleChange}
            name="date"
            value={inputs.date}
            margin="normal"
            variant="standard"
            required
          />
          <Button
            type="submit"
            color="warning"
            sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
            variant="contained"
          >
            POST
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Add;
