import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />

      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/s" element={<SearchPage />} />

          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
