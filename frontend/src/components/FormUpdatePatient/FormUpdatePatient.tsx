import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {Input, InputSelect} from '../Input/Input';
import {tooltipValidate, optionsStaff} from '../../utils/constant';
import {selectOptions, RegisterProps} from '../../app/types'
import { fetchRegisterStaff } from '../../features/authStaff';
import {searchByLabel, searchByValue} from '../../utils/utils'
import DropboxMain from '../DropboxMain/DropboxMain';
import { FileDoc } from '../../app/types';
import { fetchGetPatient } from '../../features/getPatient';



interface FormUpdatePatientProps {
    // surName: string;
    // name: string;
    // middleName: string;
    // gender: string;
    // birthDay: string;
    selectOptionsProps: {
        selectInput: selectOptions[];
        selectName: string;
        selectLabel: string;
    };
    data: RegisterProps;
}

const FormUpdatePatient: FC<FormUpdatePatientProps> = ({selectOptionsProps, data}) => {
  const dispatch = useAppDispatch();
  const isValid = useAppSelector((state) => state.toolTipReducer.results)
  const getPatient = useAppSelector((state) => state.getPatientReducer.patientData)
  const [selectValue, setSelectValue] = useState('');
  const [buttonSbtEnabled, setButtonSbtEnabled] = useState(false)

  useMemo(() => {
    dispatch(fetchGetPatient('6516cfa1c5c09557bc2a1010'))
  },[dispatch])

  useEffect(() => {
    console.log(isValid)
    setButtonSbtEnabled(true)
  },[isValid])
  
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData: RegisterProps = { ...data };

    formData.forEach((value, key) => {
      updatedData[key as keyof RegisterProps] = value as any; // Приводим к нужным типам
    });
    updatedData.role=selectValue

  };
  

  const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(searchByLabel(e.target.value, optionsStaff));
  };
    return (<>
        <Form className='form-update-patient container-fluid' onSubmit={submitForm}>
            <Form.Group className='p-3 pb-5 pt-5'>
                <Input 
                    type='text' 
                    name='surName' 
                    label={'Фамилия'} 
                    tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
                    availableValue={getPatient.surName}
                />
                <Input 
                    type='text' 
                    name='name' 
                    label={'Имя'} 
                    tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
                    availableValue={getPatient.name}
                />
                <Input 
                    type='text' 
                    name='middleName' 
                    label={'Отчество'} 
                    tooltipValidate={[tooltipValidate.min2Symbol, tooltipValidate.max16Symbol, tooltipValidate.ruSymbol]} 
                    availableValue={getPatient.middleName}
                />

                <InputSelect
                    type='text'
                    name={selectOptionsProps.selectName}
                    label={selectOptionsProps.selectLabel}
                    optionsSelect={selectOptionsProps.selectInput}
                    onChangeSelect={handleSelectValue}
                    availableValue={getPatient.gender}
                />
                <DropboxMain></DropboxMain>
                <Button type='submit' className='container-fluid form-auth__button-submit' disabled={buttonSbtEnabled}>
                  Изменить
                </Button>
            </Form.Group>
        </Form>
    </>);
}

export default FormUpdatePatient;
