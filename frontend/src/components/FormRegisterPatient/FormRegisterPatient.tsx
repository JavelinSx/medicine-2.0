import React, { FC, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from '../Select/Select';
import { optionsGender } from '../../utils/constant';
import { useAppDispatch } from '../../app/hooks';
import { fetchRegisterPatient } from '../../features/authPatient';
interface FormRegisterPatientProps {}

const FormRegisterPatient: FC<FormRegisterPatientProps> = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    surName: '',
    name: '',
    middleName: '',
    gender: '',
    dateBirthday: '',
    role: 'patient',
    login: '',
    password: '',
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterPatient(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Form className='form-register container-fluid' onSubmit={submitForm}>
        <Form.Group className='p-3 pb-5 pt-5'>
          <FloatingLabel label='Фамилия' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Фамилия' onChange={handleInputChange} name='surName' />
          </FloatingLabel>

          <FloatingLabel label='Имя' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Имя' onChange={handleInputChange} name='name' />
          </FloatingLabel>

          <FloatingLabel label='Отчество' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Отчество' onChange={handleInputChange} name='middleName' />
          </FloatingLabel>

          <Select
            labelTitle='Выберите пол:'
            defaultSelect={1}
            optionsSelect={optionsGender}
            onChange={handleInputChange}
          />

          <FloatingLabel label='Дата рождения' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='01.01.1970' onChange={handleInputChange} name='dateBirthday' />
          </FloatingLabel>

          <FloatingLabel label='Логин' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Логин' onChange={handleInputChange} name='login' />
          </FloatingLabel>

          <FloatingLabel label='Пароль' className='mb-3 form-register__label'>
            <Form.Control type='password' placeholder='Пароль' onChange={handleInputChange} name='password' />
          </FloatingLabel>

          <Button type='submit' className='container-fluid form-register__button-register'>
            Зарегистрировать пациента
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormRegisterPatient;
