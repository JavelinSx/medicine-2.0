import React, { FC, useCallback, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap'
import { PatchQuestion } from 'react-bootstrap-icons'
interface InputProps {
  type: string;
  name: string;
  label: string;
  textHelp?: string[] | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputSelectProps extends InputProps {
  value: string;
  classInputSelect: string;
}

const Input: FC<InputProps> = ({ type, name, label, textHelp = null, onChange }) => {
  const [isHelpMessage, setIsHelpMessage] = useState(false);

  const handleHelpMessageShow = useCallback(() => {
    setIsHelpMessage(true)
    console.log('hello1')
  }, []);

  const handleHelpMessageHide = useCallback(() => {
    setIsHelpMessage(false);
    console.log('hello2')
  }, []);

  return (
    <FloatingLabel label={label} className='mb-3 input__label'>
      <input
        type={type}
        name={name}
        placeholder={label}
        onChange={onChange}
        className='form-control'
      />
      {
        textHelp ? 
        <>
          <div
          className='input__help-button'
          onMouseEnter={handleHelpMessageShow}
          onMouseLeave={handleHelpMessageHide}
          >
            <PatchQuestion />
          </div>
          <ul className={isHelpMessage ?'input__help-message':'input__help-message-hide'}>
          {textHelp?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          </ul>
        </>
        :
        null
      }
      
      <div className='input__error'></div>
    </FloatingLabel>
  );
}

const InputSelect: FC<InputSelectProps> = ({ type, name, label, classInputSelect, value, onChange }) => {
  return (
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
  );
}

export { Input, InputSelect };
