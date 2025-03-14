

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/home/Home'
import Cart from './Pages/cart/Cart'
import Header from './components/header/Header'

function App() {
  

  return (
    <>
    <Header/>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
