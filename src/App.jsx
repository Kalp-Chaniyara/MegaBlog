import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { login, logout } from './Feature/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())  //Means our state is always upadte if userData we have then we obviously update the state but if we have not means logout so by this our state is always updtae when we refresh
        }
      })
      .finally(() => {
        setLoading(false)  // As we reach at final state either loggedIn or loggedOut so no need to more wait for loading so mark the loading as false
      })
  }, [])

  if (loading)
    return <div>Loading...</div>
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header />
        <main>
        TODO: -- <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
