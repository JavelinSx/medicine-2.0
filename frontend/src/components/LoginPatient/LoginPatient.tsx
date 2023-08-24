import type { FC } from 'react';
import React from 'react';
import Login from '../Login/Login';
interface LoginPatientProps {}

const LoginPatient: FC<LoginPatientProps> = () => {
  return (
    <React.Fragment>
      <Login></Login>
    </React.Fragment>
  );
};

export default LoginPatient;
