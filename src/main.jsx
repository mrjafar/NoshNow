import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoreContext, StoreContextProvider } from "./context/StoreContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <StoreContextProvider store={StoreContext}>
        <ToastContainer />
        <App />
      </StoreContextProvider>
    </Provider>
  </StrictMode>
);
