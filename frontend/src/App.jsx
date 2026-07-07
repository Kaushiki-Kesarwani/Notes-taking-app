
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from './pages/Homepage.jsx';
import Create from './pages/Createpage.jsx';
import Notedetails from './pages/Notedetailspage.jsx';
import toast , {Toaster} from 'react-hot-toast';



function App() {
  const notify = () => toast.loading('Congratulations.');  
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
    <div>
      <button onClick={notify}>click</button>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
