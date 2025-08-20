import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addProduct, removeProduct } from '../store/slices/productsSlice';
import { logout } from '../store/slices/authSlice';
import LevitationLogo from '../components/LevitationLogo';

export default function AddProducts() {
  const [productName, setProductName] = useState('');
  const [productRate, setProductRate] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const dispatch = useAppDispatch();
  const { products, subTotal, gstAmount, totalAmount } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !productRate || !quantity) {
      alert('Please fill all fields');
      return;
    }

    const rate = parseFloat(productRate);
    const qty = parseInt(quantity);

    if (rate <= 0 || qty <= 0) {
      alert('Rate and quantity must be positive numbers');
      return;
    }

    dispatch(addProduct({
      name: productName,
      rate: rate,
      quantity: qty,
    }));

    // Reset form
    setProductName('');
    setProductRate('');
    setQuantity('');
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleNext = () => {
    if (products.length === 0) {
      alert('Please add at least one product before proceeding');
      return;
    }
    navigate('/generate-pdf');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LevitationLogo size="md" />
              <span className="text-white font-medium">levitation</span>
              <span className="text-gray-400 text-sm">infotech</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-lime-400 text-black text-sm font-medium px-4 py-2 rounded hover:bg-lime-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Add Products</h1>
          <p className="text-gray-400">
            This is basic login page which is used for levitation assignment purpose.
          </p>
        </div>

        {/* Add Product Form */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
                placeholder="enter the product name"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">
                Product Rate
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={productRate}
                onChange={(e) => setProductRate(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
                placeholder="Enter the rate"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">
                Product Qty
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400"
                placeholder="Enter the Qty"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-lime-400 text-black font-medium py-3 rounded-lg hover:bg-lime-300 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Add Product</span>
                <span className="bg-black bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs">+</span>
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-white text-left p-4 font-medium">
                  Product name
                  <span className="ml-2">↑↓</span>
                </th>
                <th className="text-white text-left p-4 font-medium">Rate</th>
                <th className="text-white text-left p-4 font-medium">
                  Quantity
                  <span className="ml-2">↑↓</span>
                </th>
                <th className="text-white text-left p-4 font-medium">Total Price</th>
                <th className="text-white text-left p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-gray-400 text-center p-8">
                    No products added yet. Add your first product above.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-700 hover:bg-slate-750">
                    <td className="text-white p-4">{product.name}</td>
                    <td className="text-white p-4">₹{product.rate.toFixed(2)}</td>
                    <td className="text-white p-4">{product.quantity}</td>
                    <td className="text-white p-4">INR {product.total.toFixed(2)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-400 hover:text-red-300 transition-colors font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Totals */}
          {products.length > 0 && (
            <div className="border-t border-slate-700 bg-slate-750">
              <div className="flex justify-end p-6">
                <div className="text-right space-y-3 min-w-[300px]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sub-Total:</span>
                    <span className="text-white font-medium">INR {subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Incl + GST 18%:</span>
                    <span className="text-white font-medium">INR {gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold border-t border-slate-600 pt-3">
                    <span className="text-white">Total Amount:</span>
                    <span className="text-lime-400">₹ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {products.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNext}
              className="bg-lime-400 text-black font-semibold px-8 py-4 rounded-lg hover:bg-lime-300 transition-colors flex items-center space-x-2"
            >
              <span>Generate PDF Invoice</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Product Summary */}
        {products.length > 0 && (
          <div className="mt-8 bg-slate-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Product Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-lime-400">{products.length}</div>
                <div className="text-gray-400 text-sm">Total Products</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">
                  {products.reduce((sum, p) => sum + p.quantity, 0)}
                </div>
                <div className="text-gray-400 text-sm">Total Quantity</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  ₹{totalAmount.toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm">Total Amount</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <LevitationLogo size="md" />
              <span className="text-white font-medium">levitation infotech</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Levitation Infotech. Connecting People with Technology.
              </p>
              <p className="text-lime-400 text-sm font-medium mt-1">
                Made by Harshit Singh
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
