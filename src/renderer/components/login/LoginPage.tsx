import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ILoginForm } from '../../types/auth.type';
import authService from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';
import './LoginPage.css';

function LoginPage() {
  const { register, handleSubmit, reset } = useForm<ILoginForm>();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const mutation = useMutation((data: ILoginForm) => authService.login(data), {
    onSuccess: async (data) => {
      await setToken(data);
      navigate('/');
    },
    onError: () => {
      reset();
      setLoginError('Incorrect email or password');
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email:
          <input type="email" {...register('email', { required: true })} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </label>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Logging in...' : 'Log in'}
        </button>
        {loginError && <div className="error-message">{loginError}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
