import React, { FC, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import {Input, InputSelect} from '../Input/Input';
import {tooltipValidate, optionsStaff} from '../../utils/constant';
import {selectOptions, RegisterProps} from '../../app/types'
import { fetchRegisterStaff } from '../../features/authStaff';
import {searchByLabel, searchByValue} from '../../utils/utils'
interface FormRegisterStaffProps {
  selectOptionsProps: {
    selectInput: selectOptions[];
    selectName: string;
    selectLabel: string;
  }
  data: RegisterProps 
}

const FormRegisterStaff: FC<FormRegisterStaffProps> = ({selectOptionsProps, data}) => {
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
    const updatedData: RegisterProps = { ...data };

    formData.forEach((value, key) => {
      updatedData[key as keyof RegisterProps] = value as string; // Приводим к нужным типам
    });
    updatedData.role=selectValue

    dispatch(fetchRegisterStaff(updatedData))
  };
  

  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(searchByLabel(e.target.value, optionsStaff));
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

          <InputSelect
            type='text'
            name={selectOptionsProps.selectName}
            label={selectOptionsProps.selectLabel}
            optionsSelect={selectOptionsProps.selectInput}
            onChangeSelect={handleSelectValue}
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

export default FormRegisterStaff;
