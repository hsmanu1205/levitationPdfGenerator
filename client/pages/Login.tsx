import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import LevitationLogo from '../components/LevitationLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    dispatch(loginStart());

    try {
      // Use mock authentication for testing
      const { mockAuthService } = await import('../services/mockAuth');
      const result = await mockAuthService.login(email, password);

      if (result.success) {
        dispatch(loginSuccess({ user: result.data.user, token: result.data.token }));
        navigate('/products');
      } else {
        dispatch(loginFailure(result.message || 'Login failed'));
      }
    } catch (err) {
      dispatch(loginFailure('Network error. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-6 max-w-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <LevitationLogo size="md" />
                  <span className="text-white font-medium">levitation</span>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  Thinking to Build or Streamline your online business ?
                </h3>
                <div className="bg-lime-400 text-black p-4 rounded-lg mt-4">
                  <h4 className="font-bold text-lg mb-1">Connecting People</h4>
                  <h4 className="font-bold text-lg">with Technology</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="flex justify-end mb-6 lg:mb-8">
              <span className="text-sm text-gray-400 border border-gray-600 px-3 py-1 rounded hidden sm:block">
                Connecting People With Technology
              </span>
            </div>

            {/* Login Form */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <LevitationLogo size="lg" />
                <div>
                  <h1 className="text-white text-2xl font-bold">levitation</h1>
                  <p className="text-gray-400 text-sm">infotech</p>
                </div>
              </div>

              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Let the Journey Begin!
              </h2>
              <p className="text-gray-400 mb-6 lg:mb-8 text-sm lg:text-base">
                This is basic login page which is used for levitation assignment purpose.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
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
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 text-sm lg:text-base"
                    placeholder="Enter the Password"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-400 bg-opacity-10 border border-red-400 border-opacity-20 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-lime-400 text-black font-medium px-6 py-3 rounded-lg hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
                  >
                    {loading ? 'Logging in...' : 'Login now'}
                  </button>
                  <Link
                    to="/register"
                    className="text-gray-400 text-sm hover:text-white transition-colors text-center sm:text-right"
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>

              <div className="mt-6 lg:mt-8 text-center">
                <span className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Sign up
                  </Link>
                </span>
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
