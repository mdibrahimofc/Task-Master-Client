import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useUpload from "@/hooks/useUpload";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    toast.error("please wait a few moment!")
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];
    const image = await useUpload(imageFile);

    const userData = { name, email, image };
    console.log(userData);
    if(!image || !name || !email){
      toast.error("All field must be fill up!")
      return
    }

    try {
      // const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);
      // console.log(data);
      await createUser(email, password);
      await updateUserProfile(name, image);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      // setLoadings(false)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-8">
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="mt-4 text-lg">Sign up to join our amazing community and explore endless possibilities.</p>
          <img
            src="https://i.ibb.co.com/g7Qg9Xj/online-4208112-1920.jpg"
            alt="Illustration"
            className="mt-8"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-gray-500">Sign up to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                Profile Picture
              </label>
              <input
                type="file"
                name="image"
                required
                id="image"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300"
              disabled={loading}
            >
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto" size={20} /> : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Or sign up with</p>
          </div>
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
          >
            <FcGoogle size={24} />
            <span className="ml-2">Continue with Google</span>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
