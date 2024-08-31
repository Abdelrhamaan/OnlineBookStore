import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Book from "./components/book/Book";
import CreateBook from "./components/book/CreateBook";
import ListBooks from "./components/book/ListBooks";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import ListReviews from "./components/review/ListReviews";
import CreateReview from "./components/review/CreateReview";
import NavBar from "./components/navbar/NavBar";
import { Box } from "@mui/material";
import Register from "./components/register/Register";
import { AuthProvider } from "./components/authcontext/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="books"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <ListBooks />
              </Box>
            }
          />
          <Route
            path="book/:id"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <Book />
              </Box>
            }
          />
          <Route
            path="new-book/"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <CreateBook />
              </Box>
            }
          />
          <Route
            path="reviews/:bookId"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <ListReviews />
              </Box>
            }
          />
          <Route
            path="create-review/:bookId"
            element={
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
                  padding: 2,
                }}
              >
                <CreateReview />
              </Box>
            }
          />
          <Route path="login/" element={<Login />} />
          <Route path="logout/" element={<Logout />} />
          <Route path="signup/" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
