import { FC, useState, useMemo, useCallback } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { fetchAuthStaff } from '../../features/authStaff';
import {Input, InputSelect} from '../Input/Input';
import {tooltipValidate, selectOptionsStaffProps} from '../../utils/constant';
import { AuthDataStaff } from '../../app/types';
interface FormAuthStaffProps {}

const FormAuthStaff: FC<FormAuthStaffProps> = () => {
  const dispatch = useAppDispatch();
  const [validationResults, setValidationResults] = useState<boolean[]>(new Array(2).fill(false)); // здесь необходимо указать количество input используемых в форме

  const [selectValue, setSelectValue] = useState('');

  const buttonSbtEnabled = useMemo(() => {
    return !validationResults.every((item) => item === true);
  }, [validationResults]);

  // Функция для обновления validationResults в родительском компоненте
  const updateValidationResults = useCallback((results: boolean[]) => {
    setValidationResults(results);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedFormData: AuthDataStaff = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
      role: selectValue
    };
    console.log(updatedFormData)
    dispatch(fetchAuthStaff(updatedFormData));
  };
  
  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, 'ghello')
    setSelectValue(e.target.value);
  };


  return (
    <Form className='form-auth container-fluid' onSubmit={submitForm}>
      <Form.Group className='p-3 pb-5 pt-5'>
        <InputSelect
            type='text'
            name={selectOptionsStaffProps.selectName}
            label={selectOptionsStaffProps.selectLabel}
            optionsSelect={selectOptionsStaffProps.selectInput}
            onChangeSelect={handleSelectValue}
          />
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

export default FormAuthStaff;
