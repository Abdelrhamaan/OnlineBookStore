import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import NavBar from "../components/navbar/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to the Online Book Store
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Discover, Read, and Review Your Favorite Books
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/books"
              sx={{
                padding: "0.8rem 2rem",
                fontSize: "1rem",
              }}
            >
              Browse Books
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
