import type { FC } from 'react';
import React from 'react';
import FormAuthPatient from '../FormAuthPatient/FormAuthPatient';
interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <React.Fragment>
      <FormAuthPatient></FormAuthPatient>
    </React.Fragment>
  );
};

export default Login;
