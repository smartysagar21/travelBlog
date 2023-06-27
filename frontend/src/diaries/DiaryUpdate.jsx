import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetails, postUpdate } from "../api-helpers/Helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-hot-toast";

const DiaryUpdate = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    date: "",
  });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          description: data.post.description,
          location: data.post.location,
          imageUrl: data.post.image,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onResReceived = (data) => {
    console.log(data);
    toast.success("Post Edited Successfully");
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs, id)
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
      {post && (
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
      )}
    </Box>
  );
};

export default DiaryUpdate;
