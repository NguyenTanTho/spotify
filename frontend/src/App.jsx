import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/User";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";
import Admin from "./pages/Admin";
import Loading from "./components/Loading";
import PaymentPage from "./pages/PayMentPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Đảm bảo import đúng

const App = () => {
  const { loading, user, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PayPalScriptProvider options={{ "client-id": "AU1Fhg_d8byDCkxAbMuXA-zrf41gPaU9uHoh0ms8UcVeg5TJzXWAi4uRhuz5tZIiAGlqgr3HIf3fMpox" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={isAuth ? <Home /> : <Login />} />
              <Route
                path="/playlist"
                element={isAuth ? <PlayList user={user} /> : <Login />}
              />
              <Route
                path="/album/:id"
                element={isAuth ? <Album user={user} /> : <Login />}
              />
              <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route path="/register" element={isAuth ? <Home /> : <Register />} />
              <Route path="/payment" element={isAuth ? <PaymentPage /> : <Login />} /> {/* Đảm bảo route này đúng */}
            </Routes>
          </BrowserRouter>
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default App;
