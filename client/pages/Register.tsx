import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LevitationLogo from '../components/LevitationLogo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError('');
    setEmailError('');
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Use mock authentication for testing
      const { mockAuthService } = await import('../services/mockAuth');
      const result = await mockAuthService.register(name, email, password);

      if (result.success) {
        // Redirect to login page on successful registration
        navigate('/login');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="flex items-center space-x-3">
                <LevitationLogo size="md" />
                <span className="text-white font-medium">levitation</span>
              </div>
              <Link
                to="/login"
                className="bg-lime-400 text-black text-sm font-medium px-3 py-2 lg:px-4 lg:py-2 rounded hover:bg-lime-300 transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Registration Form */}
            <div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Sign up to begin journey
              </h2>
              <p className="text-gray-400 mb-6 lg:mb-8 text-sm lg:text-base">
                This is basic signup page which is used for levitation assignment purpose.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div>
                  <label className="text-white text-sm font-medium block mb-2">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 text-sm lg:text-base"
                    placeholder="Enter your name"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    This name will be displayed with your inquiry
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 text-sm lg:text-base"
                    placeholder="Enter Email ID"
                    required
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-1">{emailError}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    This email will be displayed with your inquiry
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium block mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 text-sm lg:text-base"
                    placeholder="Enter the Password"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Any further updates will be forwarded on this Email ID
                  </p>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-400 bg-opacity-10 border border-red-400 border-opacity-20 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-lime-400 text-black font-medium px-6 py-3 rounded-lg hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                  <span className="text-gray-400 text-sm text-center sm:text-left">
                    Already have account?{' '}
                    <Link to="/login" className="text-lime-400 hover:text-lime-300 transition-colors">
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="bg-lime-400 text-black p-6 lg:p-8 rounded-lg max-w-lg">
                <h3 className="text-xl lg:text-2xl font-bold mb-4">Connecting People</h3>
                <h3 className="text-xl lg:text-2xl font-bold mb-4">With Technology</h3>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded mt-6">
                  <p className="text-xs lg:text-sm">
                    CYBER DEVELOPMENT | BUI CRM SERVICES | WEB DESIGN & DEVELOPMENT | DIGITAL MARKETING
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-4 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <span className="text-white text-sm">levitation infotech</span>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-xs">
                © 2024 Levitation Infotech. Connecting People with Technology.
              </p>
              <p className="text-lime-400 text-xs font-medium mt-1">
                Made by Harshit Singh
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
