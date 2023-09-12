import React, { FC } from 'react';
import {FloatingLabel} from 'react-bootstrap'

interface InputProps {
    type: string;
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface InputSelectProps extends InputProps{
  value: string;
  classInputSelect: string;
}


const Input: FC<InputProps> = ({ type, name, label, onChange}) => {
    return (
      <FloatingLabel label={label} className='mb-3 input__label'>
        <input
          type={type}
          name={name}
          placeholder={label}
          onChange={onChange}
          className='form-control'
        />
      </FloatingLabel>
    );
  }

  const InputSelect: FC<InputSelectProps> = ({type, name, label, classInputSelect, value, onChange}) => {
    return(
      <FloatingLabel label={label} className='input__label'>
      <input
        type={type}
        name={name}
        placeholder={label}
        className={classInputSelect}
        value={value}
        onChange={onChange}
        readOnly
      />
    </FloatingLabel>
    )
  }

export {Input, InputSelect};
