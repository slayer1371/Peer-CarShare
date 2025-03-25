import { BrowserRouter } from 'react-router'
import './App.css'
import { UserProvider } from './context/UserContext'
import AppRoutes from './AppRoutes'


function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
