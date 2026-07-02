import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import KeycapList from "./pages/KeycapList";
import AccessoryList from "./pages/AccessoryList";
import SwitchList from "./pages/SwitchList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Feedback from "./pages/Feedback";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="keycaps" element={<KeycapList />} />
              <Route path="accessories" element={<AccessoryList />} />
              <Route path="switches" element={<SwitchList />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
