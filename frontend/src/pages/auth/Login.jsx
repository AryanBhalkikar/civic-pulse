import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import axios from 'axios';
import { getApiUrl } from '../../config/api';
import './Auth.css';

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.233 17.64 11.925 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try{
      const response = await axios.post(
        getApiUrl('/api/login'), 
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/mapPage');
      }

    }
    catch (err){
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <AuthLayout>
      <div className="auth-form-wrap">

        {/* Tabs */}
        <div className="auth-tabs">
          <span className="auth-tab active">Log in</span>
          <Link to="/signup" className="auth-tab">Sign up</Link>
        </div>

        {/* Google button */}
        {/* <button className="btn-google">
          <GoogleIcon />
          Continue with Google
        </button> */}

        <div className="auth-divider">
          <div className="divider-line"></div>
          {/* <span className="divider-text">or with email</span> */}
          <div className="divider-line"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <div className="field-hint">
              Forgot your password? <a href="#">Reset it</a>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Log in to ZonePulse
          </button>
        </form>

        <p className="auth-footer-note">
          Don't have an account? <Link to="/signup">Sign up — it's free</Link>
        </p>

      </div>
    </AuthLayout>
  )
}

export default Login;