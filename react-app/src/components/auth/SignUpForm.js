import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let validateErrors = []
    if (password !== repeatPassword) validateErrors.push('Passwords do not match.')
    if (firstname.length > 50) validateErrors.push('Firstname cannot be greater than 50 characters.')
    if (lastname.length > 50) validateErrors.push('Lastname cannot be greater than 50 characters.')
    if (username.length > 50) validateErrors.push('Username cannot be greater than 50 characters.')
    await setErrors(validateErrors)

    if (errors.length === 0) {
      await dispatch(signUp(username, email, password, firstname, lastname));
      return <Redirect to='/' />;
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        <i className="fas fa-times signup-cancel" onClick={() => setShowModal(false)}></i>
      </div>
      <div id='signUpFormContainer'>
        <div>
          <div>
            <h1 id='signUpTitle'>Sign Up</h1>
          </div>
          <form onSubmit={onSignUp} id='signUpForm'>
            <div className='loginInputsDiv'>
              <label>User Name</label>
              <input
                className='signUpInputs'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder='User Name'
                required={true}
              ></input>
            </div>
            <div className='loginInputsDiv'>
              <label>First Name</label>
              <input
                className='signUpInputs'
                type='text'
                name='firstname'
                onChange={updateFirstname}
                value={firstname}
                placeholder='First Name'
                required={true}
              ></input>
            </div>
            <div className='loginInputsDiv'>
              <label>Last Name</label>
              <input
                className='signUpInputs'
                type='text'
                name='lastname'
                onChange={updateLastname}
                value={lastname}
                placeholder='Last Name'
                required={true}
              ></input>
            </div>
            <div className='loginInputsDiv'>
              <label>Email</label>
              <input
                className='signUpInputs'
                type='email'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder='Email'
                required={true}
              ></input>
            </div>
            <div className='loginInputsDiv'>
              <label>Password</label>
              <input
                className='signUpInputs'
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder='Password'
                required={true}
              ></input>
            </div>
            <div className='loginInputsDiv'>
              <label>Confirm Password</label>
              <input
                className='signUpInputs'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                placeholder='Confirm Password'
                required={true}
              ></input>
            </div>
            <div id='errorsDiv'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <button className='signUpButton' type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
