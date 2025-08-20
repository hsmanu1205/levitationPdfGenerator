import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store/hooks';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProducts from './pages/AddProducts';
import GeneratePDF from './pages/GeneratePDF';
import NotFound from './pages/NotFound';

function AppRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/Index" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/products" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/products" />} />
      <Route path="/products" element={isAuthenticated ? <AddProducts /> : <Navigate to="/login" />} />
      <Route path="/AddProducts" element={isAuthenticated ? <AddProducts /> : <Navigate to="/login" />} />
      <Route path="/generate-pdf" element={isAuthenticated ? <GeneratePDF /> : <Navigate to="/login" />} />
      <Route path="/GeneratePDF" element={isAuthenticated ? <GeneratePDF /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
