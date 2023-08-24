import { FC, useRef } from 'react';
import React from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { fetchAuthPatient } from '../../features/authPatient';
interface FormAuthProps {}

const FormAuth: FC<FormAuthProps> = () => {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      login: loginRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    dispatch(fetchAuthPatient(formData));
  };

  return (
    <Form className='form-auth container-fluid' onSubmit={submitForm}>
      <Form.Group className='p-3 pb-5 pt-5'>
        <FloatingLabel label='Логин' className='mb-3 form-auth__label'>
          <Form.Control type='text' placeholder='Логин' autoComplete='true' name='login' ref={loginRef} />
        </FloatingLabel>
        <FloatingLabel label='Пароль' className='mb-3 form-auth__label'>
          <Form.Control type='password' placeholder='Пароль' autoComplete='true' name='password' ref={passwordRef} />
        </FloatingLabel>
        <Button type='submit' className='container-fluid form-auth__button-submit'>
          Войти
        </Button>
      </Form.Group>
    </Form>
  );
};

export default FormAuth;
