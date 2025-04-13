import React, { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Contact, { contactData } from "./pages/Contact/Contact";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import LoginPopup from "./components/UI/LoginPopUP/LoginPopup";
import { StoreContext } from "./context/StoreContext";
// import { ViewMore } from "./pages/ViewMore/ViewMore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        element: <PlaceOrder />,
      },
      {
        path: "contact",
        element: <Contact />,
        action: contactData,
      },
    ],
  },
]);

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(StoreContext);
  // const navigate = useNavigate();
  useEffect(() => {
    // Listen for authentication state changes
    const logOut = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user); // Set to true if user is authenticated
      // navigate("/")
    });


    // Cleanup the listener
    return () => logOut();
  }, []);
  return (
    <>{isAuthenticated ? <RouterProvider router={router} /> : <LoginPopup />}</>
  );
};

export default App;
