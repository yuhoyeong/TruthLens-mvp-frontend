import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppLayout from './layout/AppLayout'

function App() {

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
