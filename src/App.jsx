import { lazy, useEffect, } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersThunk } from './redux/usersThunk';
import './main.css';
const NavMenu = lazy(() => import('./components/NavMenu'));
const Home = lazy(() => import('./components/Home'));
const UserList = lazy(() => import('./components/UserList'));
const Login = lazy(() => import('./components/Login'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const { isLoggedIn } = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<NavMenu />}>
          <Route index element={isLoggedIn ? <Home /> : <Login />} />
          <Route path='/list' element={isLoggedIn ? <UserList /> : <Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
