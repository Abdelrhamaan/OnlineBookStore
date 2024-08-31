import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateReview() {
  const { bookId } = useParams();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/books/${bookId}/reviews/`,
        {
          review_text: review,
          rating: rating,
          book: `${bookId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/books");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Your Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          variant="outlined"
          fullWidth
          margin="normal"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <TextField
          label="Rating"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
