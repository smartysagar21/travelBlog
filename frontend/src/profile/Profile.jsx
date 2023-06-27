import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api-helpers/Helpers";
import { Box, Button, Typography } from "@mui/material";
import DiaryItem from "../diaries/DiaryItem";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    toast.success("Logged Out Successfully");
    navigate("/");
  };
  return (
    <Box display={"flex"} flexDirection={"column"}>
      {user && (
        <>
          <Typography
            textAlign={"center"}
            variant="h3"
            fontFamily={"quicksand"}
            padding={2}
          >
            User Profile
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign={"left"}>
            Name: {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign={"left"}>
            Email: {user.email}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: "auto", width: "12%" }}
            color="warning"
            variant="contained"
          >
            Logout
          </Button>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {user.posts.map((post, index) => (
              <DiaryItem
                date={new Date(`${post.date}`).toLocaleDateString()}
                key={index}
                title={post.title}
                description={post.description}
                id={post._id}
                image={post.image}
                location={post.location}
                user={user._id}
                name={user.name}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
