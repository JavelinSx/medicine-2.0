import React, { FC, useCallback, useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from '../Select/Select';
import { optionsGender } from '../../utils/constant';
import { useAppDispatch } from '../../app/hooks';
import { fetchRegisterPatient } from '../../features/authPatient';
import {Input} from '../Input/Input';
import {tooltipValidate} from '../../utils/constant';

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form as FormikForm,
  Field,
  FieldProps,
} from 'formik';

interface FormRegisterPatientProps {}

const FormRegisterPatient: FC<FormRegisterPatientProps> = () => {
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState('');
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
    updatedFormData['gender'] = selectValue;

    dispatch(fetchRegisterPatient(updatedFormData));
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };



  return (
    <>
      <Form className='form-register container-fluid' onSubmit={submitForm}>
        <Form.Group className='p-3 pb-5 pt-5'>
          <Input 
            type='text' 
            name='surName' 
            label={'Фамилия'} 
            tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
            results={updateValidationResults}
          />
          <Input 
            type='text' 
            name='name' 
            label={'Имя'} 
            tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
            results={updateValidationResults}
          />
          <Input 
            type='text' 
            name='middleName' 
            label={'Отчество'} 
            tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
            results={updateValidationResults}
          />

          <Select
            name='gender'
            labelTitle='Выберите пол:'
            optionsSelect={optionsGender}
            onChangeSelect={handleSelectValue}
          />

          <Input 
            type='date' 
            name='dateBirthday' 
            label={'Дата рождения'} 
            tooltipValidate={[]} 
            results={updateValidationResults}
          />
          <Input 
            type='text' 
            name='login' 
            label={'Логин'} tooltipValidate={[tooltipValidate.min4Symbol, tooltipValidate.max16Symbol, tooltipValidate.engSymbol]} 
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

          <Button type='submit' className='container-fluid form-register__button-register' disabled={buttonSbtEnabled}>
            Зарегистрировать пациента
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormRegisterPatient;
