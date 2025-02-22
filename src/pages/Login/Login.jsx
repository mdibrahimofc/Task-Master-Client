import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h1>
        <p className="text-center text-gray-600 mt-2">Login to your account</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            {loading ? <TbFidgetSpinner className="animate-spin mx-auto" /> : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full border py-2 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <FcGoogle size={24} className="mr-2" /> Sign in with Google
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-500 hover:text-green-500"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-green-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
