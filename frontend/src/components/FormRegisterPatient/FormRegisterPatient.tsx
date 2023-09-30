import React, { FC, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRegisterPatient, } from '../../features/authPatient';
import {Input, InputSelect} from '../Input/Input';
import {tooltipValidate } from '../../utils/constant';
import {selectOptions, RegisterPatient} from '../../app/types'

interface FormRegisterPatientProps {
  selectOptionsProps: {
    selectInput: selectOptions[];
    selectName: string;
    selectLabel: string;
  }
  data: RegisterPatient  
}

const FormRegisterPatient: FC<FormRegisterPatientProps> = ({selectOptionsProps, data}) => {
  const dispatch = useAppDispatch();
  const isValid = useAppSelector((state) => state.toolTipReducer.results)
  const [selectValue, setSelectValue] = useState('');
  const [validationResults, setValidationResults] = useState<boolean[]>(new Array(4).fill(false)); // здесь необходимо указать количество input используемых в форме
  const [buttonSbtEnabled, setButtonSbtEnabled] = useState(false)

  useEffect(() => {
    console.log(isValid)
    setButtonSbtEnabled(validationResults.every((item) => item === true) ? false : true)
  },[validationResults, isValid])

  // Функция для обновления validationResults в родительском компоненте
  const updateValidationResults = (results: boolean[]) => {
    setValidationResults(results);
  };
  
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData: RegisterPatient = { ...data };

    formData.forEach((value, key) => {
      updatedData[key as keyof RegisterPatient] = value as any; // Приводим к нужным типам
    });
    updatedData.gender = selectValue
    updatedData.files = []
    
    dispatch(fetchRegisterPatient(updatedData))
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
          />
          <Input 
            type='text' 
            name='name' 
            label={'Имя'} 
            tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
          />
          <Input 
            type='text' 
            name='middleName' 
            label={'Отчество'} 
            tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
          />

          <InputSelect
            type='text'
            name={selectOptionsProps.selectName}
            label={selectOptionsProps.selectLabel}
            optionsSelect={selectOptionsProps.selectInput}
            onChangeSelect={handleSelectValue}
          />        

          <Input 
            type='date' 
            name='dateBirthday' 
            label={'Дата рождения'} 
            tooltipValidate={[]} 
          />
          <Input 
            type='text' 
            name='login' 
            label={'Логин'} tooltipValidate={[tooltipValidate.min4Symbol, tooltipValidate.max16Symbol, tooltipValidate.engSymbol]} 
          />
          <Input 
            type='password' 
            name='password' 
            label={'Пароль'} 
            tooltipValidate={[tooltipValidate.min8Symbol, tooltipValidate.max16Symbol, tooltipValidate.engSymbol, tooltipValidate.differentSymbol]} 
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
