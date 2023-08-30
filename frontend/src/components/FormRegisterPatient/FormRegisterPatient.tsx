import React, { FC, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Select from '../Select/Select';
import { optionsGender } from '../../utils/constant';
import { useAppDispatch } from '../../app/hooks';
import { fetchRegisterPatient } from '../../features/authPatient';
import { patternDate, patternCustomText, patternLogin, patternPassword } from '../../utils/constant';
interface FormRegisterPatientProps {}
interface ErrorObject {
  inputName: string;
  errorMessage: string;
}
const FormRegisterPatient: FC<FormRegisterPatientProps> = () => {
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState('');
  const [error, setError] = useState<ErrorObject[]>([]);

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

  const handleErrorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Проверяем, есть ли ошибка для данного поля
    const existingErrorIndex = error.findIndex((error) => error.inputName === name);

    //  // Очищаем предыдущий таймер, если есть
    // if (validationTimeout) {
    //   clearTimeout(validationTimeout);
    // }

    // // Запускаем таймер на 500 миллисекунд
    // const validationTimeout = setTimeout(() => {
    //   validateInput(newValue); // Здесь вызывается ваша функция валидации
    // }, 500);

    if (name === 'dateBirthday' && patternDate.test(value)) {
      // Если есть ошибка, удаляем её
      if (existingErrorIndex !== -1) {
        setError((prevErrors) => prevErrors.filter((_, index) => index !== existingErrorIndex));
      }
    } else if (name === 'surName' && patternCustomText.test(value)) {
      // Если есть ошибка, удаляем её
      if (existingErrorIndex !== -1) {
        setError((prevErrors) => prevErrors.filter((_, index) => index !== existingErrorIndex));
      }
    } else {
      // Если ошибки нет, добавляем её
      if (existingErrorIndex === -1) {
        setError((prevErrors) => [
          ...prevErrors,
          {
            inputName: name,
            errorMessage: name === 'dateBirthday' ? 'Дата должна быть в формате дд.мм.гггг' : 'Ошибка ввода имени',
          },
        ]);
      }
    }
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <>
      <Form className='form-register container-fluid' onSubmit={submitForm}>
        <Form.Group className='p-3 pb-5 pt-5'>
          <FloatingLabel label='Фамилия' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Фамилия' name='surName' onChange={handleErrorInput} />
          </FloatingLabel>

          <FloatingLabel label='Имя' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Имя' name='name' />
          </FloatingLabel>

          <FloatingLabel label='Отчество' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Отчество' name='middleName' />
          </FloatingLabel>

          <Select
            labelTitle='Выберите пол:'
            defaultSelect={1}
            optionsSelect={optionsGender}
            onChange={handleSelectValue}
          />

          <FloatingLabel label='Дата рождения' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='01.01.1970' name='dateBirthday' onChange={handleErrorInput} />
          </FloatingLabel>

          <FloatingLabel label='Логин' className='mb-3 form-register__label'>
            <Form.Control type='text' placeholder='Логин' name='login' />
          </FloatingLabel>

          <FloatingLabel label='Пароль' className='mb-3 form-register__label'>
            <Form.Control type='password' placeholder='Пароль' name='password' />
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
