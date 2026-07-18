
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from './pages/Homepage.jsx';
import Create from './pages/Createpage.jsx';
import Notedetails from './pages/Notedetailspage.jsx';
import toast , {Toaster} from 'react-hot-toast';
import SignupPage from './pages/signupPage.jsx';
import Login  from './pages/loginPage.jsx'
import ProtectedRoutes from './components/protectedRoutes.jsx'
import PublicRoutes from './components/publicRoutes.jsx';

function App() {
   
const router = createBrowserRouter([
  {
    path:'/',
    element:(
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path:'/create',
    element:(
      <ProtectedRoutes>
        <Create />
      </ProtectedRoutes>
    ),
  },
  {
    path:'/notes/:id',
    element:(
      <ProtectedRoutes>
        <Notedetails />
      </ProtectedRoutes>
    ),
  },
  {
    path:'/signup',
    element:(
      <PublicRoutes>
        <SignupPage/>
      </PublicRoutes>
    ),
  },
  {
    path:'/login',
    element:(
      <PublicRoutes>
        <Login/>
      </PublicRoutes>
    ),
  }
]);
  return (
     <div className="relative min-h-screen overflow-hidden bg-base-200">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_40%),linear-gradient(to_bottom,var(--fallback-b1,#18181b),var(--fallback-b2,#111827))]" />

      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
