import { useState, lazy, startTransition, useEffect, } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUsersThunk } from './redux/actions';
import './main.css';
const NavMenu = lazy(() => import('./components/NavMenu'));
const Home = lazy(() => import('./components/Home'));
const UserList = lazy(() => import('./components/UserList'));
const Login = lazy(() => import('./components/Login'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.user)
  const dispatch = useDispatch()

  const handleLogin = () => {
    startTransition(() => setIsLoggedIn(true))
  }

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [dispatch])

  return (
    <>
      {isLoggedIn ? <NavMenu /> : null}
      <Routes>
        <Route index element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />} />
        <Route path='/list' element={isLoggedIn ? <UserList /> : <Login onLogin={handleLogin} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
