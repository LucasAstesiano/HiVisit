import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { Header } from './components/header/Header'
import { UserAdministration } from './pages/UserAdministration'
import { Sesion } from './pages/Sesion'
import { UserProvider } from './context/UserContext'
import { HomeAdmin } from './pages/HomeAdmin'
import { VisitProvider } from './context/VisitContext'


function App() {


  return (
    <VisitProvider>
      <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/sesion" element={<Sesion />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/history" element={<History />} />
          <Route path='/user' element={<UserAdministration />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </VisitProvider>
  )
}

export default App
