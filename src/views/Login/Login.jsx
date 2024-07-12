import React, { useState, useEffect } from "react";
import { login, loginWithGoogle } from "../../actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { email, password } = formData;
  const dataAuth = useSelector(state => state.auth.data);
  const errorAuth = useSelector(state => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoginAttempted(true);
    await dispatch(login(email, password));
  };

  useEffect(() => {
    if (dataAuth && loginAttempted) {
      navigate('/dashboard');
      setLoginAttempted(false);
    }
  }, [dataAuth, navigate, loginAttempted]);

  useEffect(() => {
    if (errorAuth) {
      const errorMessage = errorAuth.message ? errorAuth.message : 'Unauthorized'
      setError(errorMessage);
    }
  }, [errorAuth]);


  const onSuccess = (googleUser) => {
    setLoginAttempted(true);
    dispatch(loginWithGoogle(googleUser.credential));
  };

  const onFailure = () => {
    setError("Login Error");
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
            name="email"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input
                className="mr-1"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          {error && <p className="text-red-500 p-0 mt-2">{error}</p>}
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/register"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;