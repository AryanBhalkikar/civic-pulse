import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from './AuthLayout';
import { getApiUrl } from '../../config/api';
import './Auth.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
        getApiUrl('/api/signup'), 
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Signup successful! Redirecting to login.');
        navigate('/login');
      }

    }
    catch (err){
      console.error(err.message);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-form-wrap">

        {/* Tabs */}
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Log in</Link>
          <span className="auth-tab active">Sign up</span>
        </div>

        {/* Info note */}
        <div className="signup-note">
          <span className="signup-note-icon">ⓘ</span>
          Currently our services are limited to the city of Bengaluru.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Arjun"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Sharma"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <button type="submit" className="btn-submit">
            Create account
          </button>
        </form>

        {/* <p className="auth-footer-note">
          By signing up you agree to our <a href="#">Terms</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </p> */}

      </div>
    </AuthLayout>
  )
}

export default Signup