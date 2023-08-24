import type { FC } from 'react';
import React from 'react';
import FormRegisterPatient from '../FormRegisterPatient/FormRegisterPatient';
interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  return (
    <React.Fragment>
      <FormRegisterPatient></FormRegisterPatient>;
    </React.Fragment>
  );
};

export default Register;
