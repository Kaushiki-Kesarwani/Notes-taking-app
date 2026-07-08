
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
    <div data-theme="night"
      className="min-h-screen ">
      {/* <h1 class="text-3xl font-bold underline ">hellooooo!</h1>
      <button className='btn btn-secondary'>Click me!</button> */}
       
      {/* <button onClick={notify} className='bg-blue-500 text-white px-4 py-2 rounded'>click</button>
      <Toaster /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
