import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";

export default function Book({ book }) {
  const {
    author,
    title,
    description,
    content,
    content_file,
    rating,
    review_links,
  } = book;

  const navigate = useNavigate();

  const handleOpenBook = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      window.location.href = content_file; // If token exists, open the book
    }
  };

  const handleSeeReviews = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(`/reviews/${book.id}`);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {author}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {description}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {content}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          {content_file && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenBook}
            >
              Open Book
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSeeReviews}
          >
            See Reviews
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {Array.from({ length: rating }, (_, index) => (
            <StarIcon key={index} sx={{ color: "gold" }} />
          ))}
          {Array.from({ length: 5 - rating }, (_, index) => (
            <StarIcon key={index + rating} sx={{ color: "gray" }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
