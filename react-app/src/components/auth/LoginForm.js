import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
import SignUpFormModal from './SignUpFormModal';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
    return <Redirect to='/' />;
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='loginPage'>
      <form onSubmit={onLogin} id='loginForm'>
        <div id='loginTitleContainer'>
          <h1 style={{ marginBottom: '5px', color: 'red' }}>Answered</h1>
          <p style={{ margin: '0', color: 'grey' }}>Get the answers to all questions</p>
        </div>
        <div id='loginInputsContainer'>
          <h2 id='loginTitle'>Login</h2>
          <div className='loginInputsDiv'>
            <label htmlFor='email'>Email</label>
            <input
              className='loginInputs'
              name='email'
              type='text'
              placeholder='Your Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='loginInputsDiv'>
            <label htmlFor='password'>Password</label>
            <input
              className='loginInputs'
              name='password'
              type='password'
              placeholder='Your Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='loginErrors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <SignUpFormModal />
            <button className='authButton' type='submit'>Login</button>
            <button className='authButton' onClick={(e) => demoLogin(e)}>Demo User</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
