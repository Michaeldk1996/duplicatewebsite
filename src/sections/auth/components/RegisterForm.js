/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './LoginForm.css';

import { paths } from 'src/routes/paths';
import { useAuthContext } from '../../../auth/useAuthContext';

/* EYE ICONS */
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer eye */}
    <path
      d="M1.05372 7.73775C1.99075 6.25275 4.78231 2.50001 9.03648 2.50001
      C13.2906 2.50001 16.0822 6.25404 17.02 7.73903
      C17.1336 7.91876 17.1903 8.00863 17.2221 8.14724
      C17.2459 8.25134 17.2459 8.41556 17.222 8.51966
      C17.1903 8.65826 17.1331 8.74872 17.0188 8.92965
      C16.0822 10.4146 13.2906 14.1667 9.03648 14.1667
      C4.78231 14.1667 1.99075 10.4126 1.05291 8.92766"
      stroke="#AFAFAF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Pupil */}
    <circle
      cx="9.03648"
      cy="8.33334"
      r="2.5"
      stroke="#AFAFAF"
      strokeWidth="1.66667"
    />
  </svg>
);


const EyeOffIcon = () => (

  <svg width="20" height="20" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.98859 2.57694C8.32726 2.52687 8.67664 2.50001 9.03648 2.50001C13.2906 2.50001 16.0822 6.25404 17.02 7.73903C17.1336 7.91876 17.1903 8.00863 17.2221 8.14724C17.2459 8.25134 17.2459 8.41556 17.222 8.51966C17.1903 8.65826 17.1331 8.74872 17.0188 8.92965C16.7689 9.32513 16.3879 9.88093 15.8832 10.4837M4.63973 3.92921C2.83801 5.15143 1.61484 6.84949 1.05372 7.73775C0.939704 7.91824 0.882695 8.00848 0.850915 8.14708C0.827047 8.25117 0.827037 8.41538 0.850894 8.51948C0.882657 8.65808 0.939409 8.74794 1.05291 8.92766C1.99075 10.4126 4.78231 14.1667 9.03648 14.1667C10.7518 14.1667 12.2294 13.5563 13.4435 12.7305M1.53648 0.833344L16.5365 15.8333M7.26871 6.56558C6.8163 7.01799 6.53648 7.64299 6.53648 8.33334C6.53648 9.71406 7.65577 10.8333 9.03648 10.8333C9.72684 10.8333 10.3518 10.5535 10.8042 10.1011" stroke="#AFAFAF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);
export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { register: registerUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const RegisterSchema = Yup.object({
    userName: Yup.string().required('Full name is required').min(6),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required').min(6),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const [emailValue, setEmailValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password, data.userName);
      navigate(paths.exclusive, {
        state: { background: location },
      });

    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-layout">
      {loading && (
        <div className="backdrop">
          <div className="spinner" />
        </div>
      )}

      {/* LEFT */}
      <div className="login-left">
        <div className="brand-top">
          <img src="/img/bsplogo.png" alt="BSP Consult" />
          <p>
            BSP <span>CONSULT</span>
          </p>
        </div>

        <div className="login-card">
          <h2 className="login-title">Sign Up</h2>

          {showError && (
            <div className="error-alert">
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* USERNAME */}
            <label className="input-label">Username</label>
            <input
              className="input-field"
              placeholder="John Doe"
              {...register('userName')}
            />
            {errors.userName && <p className="error-text">{errors.userName.message}</p>}


            <label className="input-label">Email Address</label>

            <div className="input-wrapper">
              <input
                type="email"
                value={emailValue}
                placeholder="example@gmail.com"
                className={`input-field
      ${emailValue ? 'has-value' : ''}
      ${errors.email ? 'input-error' : ''}
    `}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmailValue(value);
                  setValue('email', value, { shouldValidate: false });
                }}
              />
            </div>

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}


            {/* PASSWORD */}
            <label className="input-label">Password</label>
            <div className="password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Enter your password"
                {...register('password')}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}


            {/* CONFIRM PASSWORD */}
            <label className="input-label">Confirm Password</label>
            <div className="password-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Enter your confirm password"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}


            <button type="submit" className="login-btn create">
              Sign Up
            </button>
          </form>

          <div className="register-link">
            <span>Already have an account?</span>
            <a href={paths.login}>Sign In</a>
          </div>

          <p className="terms-text">
            By creating an account, you agree to our{' '}
            <a href="/privacy-policy">Privacy Policy</a> and{' '}
            <a href="/terms-conditions">Terms & Conditions</a>.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <img src="/img/log.png" alt="Preview" />
      </div>
    </div>
  );
}

