import React, { FC, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from '../Select/Select';
import { optionsGender } from '../../utils/constant';
import { useAppDispatch } from '../../app/hooks';
import { fetchRegisterPatient } from '../../features/authPatient';
import {Input} from '../Input/Input';
import { patternDate, patternCustomText, patternLogin, patternPassword } from '../../utils/constant';
import {inputBioHelp, inputLoginHelp, inputPasswordHelp} from '../../utils/constant'
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


  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedFormData: Record<string, string> = {};

    formData.forEach((value, key) => {
      updatedFormData[key] = value as string;
    });
    updatedFormData['gender'] = selectValue;

    dispatch(fetchRegisterPatient(updatedFormData));
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(selectValue)
    setSelectValue(e.target.value);
  };

  const handleValidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Form className='form-register container-fluid' onSubmit={submitForm}>
        <Form.Group className='p-3 pb-5 pt-5'>
          <Input type='text' name='surName' label={'Фамилия'} onChange={handleValidInput} textHelp={inputBioHelp}/>
          <Input type='text' name='name' label={'Имя'} onChange={handleValidInput} textHelp={inputBioHelp}/>
          <Input type='text' name='middleName' label={'Отчество'} onChange={handleValidInput} textHelp={inputBioHelp}/>

          <Select
            name='gender'
            labelTitle='Выберите пол:'
            optionsSelect={optionsGender}
            onChangeSelect={handleSelectValue}
          />

          <Input type='date' name='dateBirthday' label={'Дата рождения'} onChange={handleValidInput}/>
          <Input type='text' name='login' label={'Логин'} onChange={handleValidInput} textHelp={inputLoginHelp}/>
          <Input type='password' name='password' label={'Пароль'} onChange={handleValidInput} textHelp={inputPasswordHelp}/>

          <Button type='submit' className='container-fluid form-register__button-register'>
            Зарегистрировать пациента
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormRegisterPatient;
