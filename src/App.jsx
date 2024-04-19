import { useState, lazy, startTransition } from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.css';
const NavMenu = lazy(() => import('./components/NavMenu'));
const Home = lazy(() => import('./components/Home'));
const UserList = lazy(() => import('./components/UserList'));
const Login = lazy(() => import('./components/Login'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.user)

  const handleLogin = () => {
    startTransition(() => setIsLoggedIn(true))
  }

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
