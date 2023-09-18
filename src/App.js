import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./Routes";
import "./App.css";
function App() {
  return (
    <div className="App">
      <ToastContainer className="toast-message" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
