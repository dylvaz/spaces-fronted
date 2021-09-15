import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { User } from '../../model/Model';
import AuthService from '../../services/AuthService';

interface LoginValues {
  username: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessfull: boolean;
}

interface LoginProps {
  callbackSetUser: (user: User) => void;
  authService: AuthService;
}

const Login: React.FC<LoginProps> = ({ authService, callbackSetUser }) => {
  let history = useHistory();

  const [values, setValues] = useState<LoginValues>({
    username: '',
    password: '',
    loginAttempted: false,
    loginSuccessfull: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await authService.login(values.username, values.password);

    if (result) {
      setValues({ ...values, loginAttempted: true, loginSuccessfull: true });
      callbackSetUser(result);
      history.push('/profile');
    } else {
      setValues({ ...values, loginAttempted: true, loginSuccessfull: false });
      alert('Incorrect credentials.');
    }
  };

  let loginMessage;

  if (values.loginAttempted) {
    if (values.loginSuccessfull) {
      loginMessage = <label> Login Successfull</label>;
    } else {
      loginMessage = <label> Login Unsuccessfull</label>;
    }
  }

  return (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={onSubmit}>
        <input
          name='username'
          value={values.username}
          type='text'
          onChange={onChange}
        />
        <br />
        <input
          name='password'
          value={values.password}
          type='password'
          onChange={onChange}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      {loginMessage}
    </div>
  );
};

export default Login;
