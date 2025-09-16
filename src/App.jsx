import './App.css'
import { Routes, Route } from "react-router-dom"


const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App
