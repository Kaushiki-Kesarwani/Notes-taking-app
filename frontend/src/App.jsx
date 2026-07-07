
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from './pages/Homepage.jsx';
import Create from './pages/Createpage.jsx';
import Notedetails from './pages/Notedetailspage.jsx';

function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/create',
    element:<Create />
  },
  {
    path:'/notes/:id',
    element:<Notedetails />
  },
]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
