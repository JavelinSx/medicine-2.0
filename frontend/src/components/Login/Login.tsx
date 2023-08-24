import type { FC } from 'react';
import React from 'react';
import FormAuth from '../FormAuth/FormAuth';
interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <React.Fragment>
      <FormAuth></FormAuth>
    </React.Fragment>
  );
};

export default Login;
