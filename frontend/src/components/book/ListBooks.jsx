import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import { Box, Grid, Pagination } from "@mui/material";
import { useAuth } from "../authcontext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/books/list/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBooks(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token might be expired or invalid, logout user
          logout();
        } else {
          console.error("Error fetching books:", error);
        }
      }
    };

    fetchBooks();
  }, [page, accessToken, navigate, logout]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Book book={book} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
}
