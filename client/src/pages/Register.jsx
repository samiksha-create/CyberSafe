import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShield } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      const user = await register(form);
      toast.success(`Account created — welcome, ${user.name}`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'phone', label: 'Mobile Number (optional)', type: 'tel', placeholder: '98765 43210' },
  ];

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
            Create your account in under a minute.
          </h1>
          <p className="text-blue-100/70 text-sm mt-4">
            Every report you file is tracked from submission to resolution, with status
            updates and admin remarks visible to you at every step.
          </p>
        </div>
        <p className="text-xs text-blue-100/50">A civic-tech reporting platform, built for India.</p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Start reporting and tracking incidents</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action-500 ${
                    errors[name] ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder={placeholder}
                />
                {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
            >
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-action-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
