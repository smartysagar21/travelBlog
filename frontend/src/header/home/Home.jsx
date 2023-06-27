import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const handleChange = () => {
    if (isLoggedIn) {
      navigate("/add");
    } else {
      toast.error("Login First");
    }
  };
  return (
    <Box className="main">
      <img className="imgFile" src="/road.jpg" alt="Road" />
      <Typography
        className="textOverImg"
        fontFamily={"Dancing Script"}
        fontWeight={"bold"}
        variant="h3"
        sx={{
          position: "absolute",
          top: "0px",
          color: "#111115de",
          background: "#B2C8DF",
        }}
      >
        Dare to live the life you've always wanted
      </Typography>
      <Box className="boxButtom">
        <Typography className="textShare" variant="h4" fontFamily={"quicksand"}>
          SHARE YOUR TRAVEL DIARIES WITH US
        </Typography>
        <Box margin="auto">
          <Button onClick={handleChange} variant="outlined" sx={{ mr: 2 }}>
            Share Your Story
          </Button>
          <Button
            LinkComponent={Link}
            to="/diaries"
            variant="contained"
            sx={{ ml: 2 }}
          >
            View Diaries
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
