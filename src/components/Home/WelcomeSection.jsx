import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const WelcomeSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="w-full text-center py-16 bg-blue-100 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to TaskMaster! 🚀
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Organize your tasks efficiently and boost your productivity.
        </p>

        {user ? (
          <p className="mt-6 text-xl font-semibold text-blue-700 dark:text-blue-400">
            Hello, {user.displayName}! 👋
          </p>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Log In to Get Started
          </button>
        )}
      </div>
    </section>
  );
};

export default WelcomeSection;
