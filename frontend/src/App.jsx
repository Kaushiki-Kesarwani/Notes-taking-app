
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from './pages/Homepage.jsx';
import Create from './pages/Createpage.jsx';
import Notedetails from './pages/Notedetailspage.jsx';
import toast , {Toaster} from 'react-hot-toast';
import SignupPage from './pages/signupPage.jsx';
import Login  from './pages/loginPage.jsx'



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
  {
    path:'/signup',
    element:<SignupPage/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);
  return (
     <div className="relative min-h-screen overflow-hidden bg-base-200">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_40%),linear-gradient(to_bottom,var(--fallback-b1,#18181b),var(--fallback-b2,#111827))]" />

      {/* <h1 class="text-3xl font-bold underline ">hellooooo!</h1>
      <button className='btn btn-secondary'>Click me!</button> */}
       
      {/* <button onClick={notify} className='bg-blue-500 text-white px-4 py-2 rounded'>click</button> */}
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
