import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { clearProducts } from '../store/slices/productsSlice';
import LevitationLogo from '../components/LevitationLogo';

export default function GeneratePDF() {
  const [generating, setGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { products, subTotal, gstAmount, totalAmount } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const generatePDFContent = () => {
    const invoiceHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .invoice-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid #e5e5e5;
            }
            .logo {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .logo-icon {
                width: 32px;
                height: 32px;
                background: #333;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .logo-text {
                font-weight: bold;
                font-size: 16px;
            }
            .invoice-title {
                text-align: right;
            }
            .invoice-title h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
            .invoice-title p {
                margin: 5px 0 0 0;
                color: #666;
                font-size: 12px;
            }
            .customer-info {
                background: #334155;
                color: white;
                padding: 20px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .customer-details h3 {
                margin: 0;
                font-size: 18px;
                color: #84cc16;
                margin-bottom: 5px;
            }
            .customer-name {
                font-size: 20px;
                font-weight: bold;
                margin: 0;
            }
            .customer-email {
                font-size: 14px;
                opacity: 0.8;
                margin: 5px 0 0 0;
            }
            .invoice-meta {
                text-align: right;
                font-size: 14px;
            }
            .products-table {
                width: 100%;
                border-collapse: collapse;
                margin: 0;
            }
            .products-table thead {
                background: #334155;
                color: white;
            }
            .products-table th,
            .products-table td {
                padding: 15px;
                text-align: left;
                border-bottom: 1px solid #e5e5e5;
            }
            .products-table th:last-child,
            .products-table td:last-child {
                text-align: right;
            }
            .products-table th {
                font-weight: 600;
                font-size: 14px;
            }
            .products-table tbody tr:nth-child(even) {
                background-color: #f8f9fa;
            }
            .totals {
                padding: 20px 30px;
                background: #f8f9fa;
            }
            .totals-grid {
                display: flex;
                justify-content: flex-end;
            }
            .totals-table {
                min-width: 300px;
            }
            .totals-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e5e5e5;
            }
            .total-final {
                font-weight: bold;
                font-size: 20px;
                color: #2563eb;
                border-top: 2px solid #334155;
                padding-top: 12px;
                margin-top: 8px;
                border-bottom: none;
            }
            .invoice-number {
                text-align: center;
                padding: 15px;
                color: #666;
                font-size: 12px;
                border-top: 1px solid #e5e5e5;
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="header">
                <div class="logo">
                    <div class="logo-icon">
                        <div style="width: 16px; height: 16px; background: white; border-radius: 2px;"></div>
                    </div>
                    <span class="logo-text">Levitation</span>
                </div>
                <div class="invoice-title">
                    <h1>INVOICE GENERATOR</h1>
                    <p>Sample Output: How Invoice format should look.</p>
                </div>
            </div>

            <div class="customer-info">
                <div class="customer-details">
                    <h3>Transfer Name:</h3>
                    <p class="customer-name">${user?.name || 'Person_name'}</p>
                    <p class="customer-email">${user?.email || 'example@gmail.com'}</p>
                </div>
                <div class="invoice-meta">
                    <div>Date: ${new Date().toLocaleDateString('en-GB')}</div>
                </div>
            </div>

            <table class="products-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map((product, index) => `
                        <tr>
                            <td>Product ${index + 1}</td>
                            <td>${product.quantity}</td>
                            <td>${product.rate}</td>
                            <td>USD ${product.total.toFixed(0)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="totals">
                <div class="totals-grid">
                    <div class="totals-table">
                        <div class="totals-row">
                            <span>Total Charges:</span>
                            <span>₹${subTotal.toFixed(0)}</span>
                        </div>
                        <div class="totals-row">
                            <span>GST (18%):</span>
                            <span>18%</span>
                        </div>
                        <div class="totals-row total-final">
                            <span>Total Amount:</span>
                            <span>₹ ${totalAmount.toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="invoice-number">
                <p>GST: ${Date.now().toString().slice(-6)}</p>
            </div>
        </div>
    </body>
    </html>
    `;
    return invoiceHtml;
  };

  const handleGeneratePDF = async () => {
    if (products.length === 0) {
      alert('No products to generate invoice for');
      return;
    }

    setGenerating(true);

    try {
      // Simulate PDF generation
      const htmlContent = generatePDFContent();
      
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      setPdfGenerated(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF');
    } finally {
      setGenerating(false);
    }
  };

  const handleBackToProducts = () => {
    navigate('/products');
  };

  const handleNewInvoice = () => {
    dispatch(clearProducts());
    navigate('/products');
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">No Products Added</h1>
          <p className="text-gray-400 mb-6">Please add products first to generate an invoice.</p>
          <button
            onClick={handleBackToProducts}
            className="bg-lime-400 text-black font-medium px-6 py-3 rounded-lg hover:bg-lime-300 transition-colors"
          >
            Go to Add Products
          </button>
        </div>
      </div>
    );
  }

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
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Generate PDF Invoice</h1>
          <p className="text-gray-400">
            Review your invoice details and generate PDF
          </p>
        </div>

        {/* Invoice Preview - Matching Sample Format */}
        <div className="bg-white rounded-lg overflow-hidden mb-8 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center space-x-3">
              <LevitationLogo size="md" />
              <span className="text-black font-medium">Levitation</span>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-black">INVOICE GENERATOR</h2>
              <p className="text-gray-600 text-sm">Sample Output: How Invoice format should look.</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-slate-800 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-400 text-sm mb-1">Transfer Name:</p>
                <p className="text-xl font-medium">{user?.name || 'Person_name'}</p>
                <p className="text-gray-300 text-sm">{user?.email || 'example@gmail.com'}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">Date: {new Date().toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Qty</th>
                <th className="text-left p-4 font-medium">Rate</th>
                <th className="text-right p-4 font-medium">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4">Product {index + 1}</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">{product.rate}</td>
                  <td className="text-right p-4">USD {product.total.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="bg-gray-50 p-6">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Total Charges:</span>
                  <span>₹{subTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>GST (18%):</span>
                  <span>18%</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-blue-600 border-t-2 border-slate-800 pt-3">
                  <span>Total Amount:</span>
                  <span>₹ {totalAmount.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Number */}
          <div className="text-center p-4 border-t">
            <p className="text-gray-500 text-sm">GST: {Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleBackToProducts}
            className="bg-slate-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-slate-600 transition-colors"
          >
            ← Back to Products
          </button>
          
          <button
            onClick={handleGeneratePDF}
            disabled={generating}
            className="bg-lime-400 text-black font-semibold px-8 py-4 rounded-lg hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {generating ? 'Generating PDF...' : 'Download PDF Invoice'}
          </button>

          <button
            onClick={handleNewInvoice}
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Create New Invoice
          </button>
        </div>

        {pdfGenerated && (
          <div className="mt-6 text-center">
            <div className="bg-green-600 bg-opacity-20 border border-green-500 rounded-lg p-4">
              <p className="text-green-400 font-medium mb-2">✅ PDF Generated Successfully!</p>
              <p className="text-gray-300 text-sm">Your invoice has been downloaded to your device.</p>
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
