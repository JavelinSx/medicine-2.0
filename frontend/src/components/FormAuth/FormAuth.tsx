import { FC, useState, useEffect } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { fetchAuthPatient } from '../../features/authPatient';
import {Input} from '../Input/Input';
import {tooltipValidate} from '../../utils/constant';
interface FormAuthProps {}

const FormAuth: FC<FormAuthProps> = () => {
  const dispatch = useAppDispatch();
  const [validationResults, setValidationResults] = useState<boolean[]>(new Array(4).fill(false)); // здесь необходимо указать количество input используемых в форме
  const [buttonSbtEnabled, setButtonSbtEnabled] = useState(false)

  useEffect(() => {
    setButtonSbtEnabled(validationResults.every((item) => item === true) ? false : true)
  },[validationResults])

  // Функция для обновления validationResults в родительском компоненте
  const updateValidationResults = (results: boolean[]) => {
    setValidationResults(results);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedFormData: Record<string, string> = {};

    formData.forEach((value, key) => {
      updatedFormData[key] = value as string;
    });

    dispatch(fetchAuthPatient(updatedFormData));
  };

  return (
    <Form className='form-auth container-fluid' onSubmit={submitForm}>
      <Form.Group className='p-3 pb-5 pt-5'>
        <Input 
          type='text' 
          name='login' 
          label={'Логин'} 
          tooltipValidate={[tooltipValidate.min4Symbol, tooltipValidate.max16Symbol, tooltipValidate.engSymbol]} 
          results={updateValidationResults}
        />
        <Input 
          type='password' 
          name='password' 
          label={'Пароль'} 
          tooltipValidate={[tooltipValidate.min8Symbol, tooltipValidate.max16Symbol, tooltipValidate.engSymbol, tooltipValidate.differentSymbol]} 
          results={updateValidationResults}
          passwordShowOn={true}
        />
        <Button type='submit' className='container-fluid form-auth__button-submit' disabled={buttonSbtEnabled}>
          Войти
        </Button>
      </Form.Group>
    </Form>
  );
};

export default FormAuth;
