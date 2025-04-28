import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoreContext, StoreContextProvider } from "./context/StoreContext.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store.jsx";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StoreContextProvider store={StoreContext}>
        <ToastContainer />
        <App />
      </StoreContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
