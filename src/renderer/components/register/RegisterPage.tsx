import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ISignupForm } from '../../types/auth.type';
import authService from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';
import './RegisterPage.css';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [registrationErrors, setRegistrationErrors] = useState<string[] | null>(
    null,
  );

  const mutation = useMutation(
    (data: ISignupForm) => authService.signup(data),
    {
      onSuccess: async (data) => {
        await setToken(data);
        navigate('/');
      },
      onError: (error: AxiosError) => {
        const { message: errorMessages } = error.response?.data as {
          message: string[];
        };

        setRegistrationErrors(errorMessages);
      },
    },
  );
  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">
            First Name
            <input type="text" {...register('firstName', { required: true })} />
          </label>
          {errors.firstName && (
            <span className="error-message">First Name is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">
            Last Name
            <input type="text" {...register('lastName', { required: true })} />
          </label>
          {errors.lastName && (
            <span className="error-message">Last Name is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input type="email" {...register('email', { required: true })} />
          </label>
          {errors.email && (
            <span className="error-message">Email is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />
          </label>
          {errors.password && (
            <span className="error-message">Password is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone
            <input
              type="text"
              {...register('phone', {
                required: true,
                pattern: /^\+(?:[0-9] ?){11}[0-9]$/,
              })}
            />
          </label>
          {errors.phone && (
            <span className="error-message">Phone is required</span>
          )}
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Registering...' : 'Register'}
        </button>
        {registrationErrors && (
          <div className="error-message">
            {registrationErrors.map((error) => (
              <p>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
