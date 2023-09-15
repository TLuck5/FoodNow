import Home from "./screens/Home"
import { Route, Routes } from "react-router-dom"
import Signup from "./screens/Signup"
import Login from "./screens/Login"
import { CartProvider } from "./components/CartProvider"
import MyOrders from "./components/MyOrders"

function App() {

  return (
    <>
      <CartProvider>
        <Routes>
          <Route element={<Home />} exact path="/" />
          <Route element={<Signup />} exact path="/createuser" />
          <Route element={<Login />} exact path="/login" />
          <Route element={<MyOrders />} exact path="/myOrders" />
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
