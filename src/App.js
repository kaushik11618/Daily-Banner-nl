import { RouterProvider } from 'react-router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from './Routes';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;