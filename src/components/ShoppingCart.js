import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import {
  Home,
  Package,
  Bell,
  PieChart,
  Clipboard,
  LogOut,
  ChevronLeft,
  Trash2,
} from "lucide-react";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(
        updateQuantity({ id, quantity: Math.max(1, item.quantity + change) })
      );
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // In a real app, you'd process the payment here
    alert("Thank you for your purchase!");
    dispatch(clearCart());
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <img
              src="/api/placeholder/50/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <nav>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-700 rounded mb-2"
            >
              <Home size={20} className="mr-2" /> Dashboard
            </Link>
            <Link
              to="/products"
              className="flex items-center p-2 text-gray-700 rounded mb-2"
            >
              <Package size={20} className="mr-2" /> Products
            </Link>
            <Link
              to="/notifications"
              className="flex items-center p-2 text-gray-700 rounded mb-2"
            >
              <Bell size={20} className="mr-2" /> Notifications
            </Link>
            <Link
              to="/analytics"
              className="flex items-center p-2 text-gray-700 rounded mb-2"
            >
              <PieChart size={20} className="mr-2" /> Analytics
            </Link>
            <Link
              to="/inventory"
              className="flex items-center p-2 text-gray-700 rounded mb-2"
            >
              <Clipboard size={20} className="mr-2" /> Inventory
            </Link>
          </nav>
        </div>
        <button className="flex items-center p-2 text-gray-700 rounded">
          <LogOut size={20} className="mr-2" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Link
          to="/dashboard"
          className="flex items-center text-purple-600 mb-8"
        >
          <ChevronLeft size={20} className="mr-2" /> Shopping Continue
        </Link>
        <div className="flex gap-8">
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            <p className="mb-8">
              You have {cartItems.length} item(s) in your cart
            </p>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg mb-4"
              >
                <img
                  src={item.image || "/api/placeholder/100/100"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500">{item.category}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold mx-8">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="w-1/3 bg-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-8">Card Details</h2>
            <div className="mb-4">
              <p className="mb-2">Card type</p>
              <div className="flex gap-2">
                <img
                  src="/api/placeholder/50/30"
                  alt="MasterCard"
                  className="w-12 h-8 object-contain bg-white rounded"
                />
                <img
                  src="/api/placeholder/50/30"
                  alt="Visa"
                  className="w-12 h-8 object-contain bg-white rounded"
                />
                <img
                  src="/api/placeholder/50/30"
                  alt="RuPay"
                  className="w-12 h-8 object-contain bg-white rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Name on card</label>
              <input
                type="text"
                value={cardDetails.nameOnCard}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, nameOnCard: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Card Number</label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                className="w-full p-2 rounded text-black"
                placeholder="1111 2222 3333 4444"
              />
            </div>
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <label className="block mb-2">Expiration date</label>
                <input
                  type="text"
                  value={cardDetails.expirationDate}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expirationDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded text-black"
                  placeholder="mm/yy"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="w-full p-2 rounded text-black"
                  placeholder="123"
                />
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="mb-8 flex justify-between font-bold">
              <span>Total (Tax incl.)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-white text-purple-600 p-3 rounded font-bold"
            >
              ${total.toFixed(2)} Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;
