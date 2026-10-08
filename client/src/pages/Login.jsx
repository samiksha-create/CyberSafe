import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShield } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { validateLoginForm } from '../utils/validators';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name}`);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy-900 text-white px-14 py-12">
        <div className="flex items-center gap-2">
          <FiShield className="w-6 h-6 text-amber-500" />
          <span className="font-heading font-bold text-lg">CyberSafe</span>
        </div>
        <div className="max-w-sm">
          <h1 className="font-heading text-3xl font-bold leading-snug">
            Report a cyber incident. Track it through to resolution.
          </h1>
          <p className="text-blue-100/70 text-sm mt-4">
            Scams, UPI fraud, phishing, hacking, and online harassment — file it once and
            follow every update in one place.
          </p>
        </div>
        <p className="text-xs text-blue-100/50">A civic-tech reporting platform, built for India.</p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your reports</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action-500 ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action-500 ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-action-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
