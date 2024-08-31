import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Pagination,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListReviews() {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/books/${bookId}/reviews/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReviews(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [bookId, page, navigate]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleAddReview = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(`/create-review/${bookId}`);
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
        Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item xs={12} key={review.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{review.user}</Typography>
                <Typography variant="body2">{review.review_text}</Typography>
                <Typography variant="body2">
                  Rating: {review.rating} stars
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddReview}>
          Add Your Review
        </Button>
      </Box>
    </Box>
  );
}
