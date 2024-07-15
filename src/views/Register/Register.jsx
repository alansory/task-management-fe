import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register, loginWithGoogle } from "../../actions/authActions";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [registerAttempted, setRegisterAttempted] = useState(false);
  const { name, email, password } = formData;
  const dataAuth = useSelector(state => state.auth.data);
  const errorAuth = useSelector(state => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim() || !name.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setRegisterAttempted(true);
    const bodyRequest = {
      name,
      email,
      password,
    };
    await dispatch(register(bodyRequest));
  };

  useEffect(() => {
    if (dataAuth && registerAttempted) {
      navigate('/dashboard');
      setRegisterAttempted(false);
    }
  }, [dataAuth, navigate, registerAttempted]);

  useEffect(() => {
    if (errorAuth) {
      const errorMessage = errorAuth.message ? errorAuth.message : 'Internal server error'
      setError(errorMessage);
    }
  }, [errorAuth]);

  const onSuccess = (googleUser) => {
    setRegisterAttempted(true);
    dispatch(loginWithGoogle(googleUser.credential));
  };

  const onFailure = () => {
    setError("Register Error");
  };


  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="flex justify-center items-center">
          <GoogleLogin
            useOneTap={true}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={name}
            onChange={handleChange}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Full name"
          />
          <input
            name="email"
            value={email}
            onChange={handleChange}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            onChange={handleChange}
            placeholder="Password"
          />
          {error && <p className="text-red-500 p-0 mt-2 mb-0">{error}</p>}
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Register;