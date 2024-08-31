import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    content_file: null,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, content_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/books/create/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/books");
    } catch (error) {
      console.error("Error creating book:", error);
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
        Create New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" color="primary">
              Upload Content File
              <input
                type="file"
                name="content_file"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
